#!/usr/bin/env bash
# .claude/hooks/pre-commit-tests.sh
# CLAUDE.md M-4: every commit must keep the test suite green.
# Auto-detects the test runner from project files. Soft-fails if no runner is
# configured (so this template repo doesn't block — the gate activates the
# moment a real test runner lands).
#
# Bypass: CODVO_SKIP_TESTS=1 — for emergency hotfixes only. Justify in PR.
# Scope: CODVO_TEST_FAST_ONLY=1 — runs the "fast" subset if the runner supports it.

set -uo pipefail
HOOK_NAME="tests"
source "$(dirname "$0")/lib/common.sh"

if [[ -n "${CODVO_SKIP_TESTS:-}" ]]; then
  log_warn "CODVO_SKIP_TESTS set — bypassing test run (justify in PR description)"
  exit 0
fi

# Only run if something testable changed — pure docs commits don't need a full test run.
relevant_files="$(git diff --cached --name-only --diff-filter=ACMR \
  | grep -E '\.(ts|tsx|js|jsx|py|go|java|cs|rs)$' \
  | grep -vE '/(node_modules|dist|build|\.venv|__pycache__|vendor)/' \
  || true)"

if [[ -z "$relevant_files" ]]; then
  log_dim "no test-relevant source files staged — skipping"
  exit 0
fi

cd "$REPO_ROOT" || exit 1

run_and_report() {
  local runner="$1"; shift
  log_info "running $runner: $*"
  if "$@"; then
    ok "$runner suite passed"
  else
    log_fail "$runner suite failed"
    log_dim "  → fix the failure or set CODVO_SKIP_TESTS=1 only for emergency hotfixes"
    hard_fail "test suite failed — commit blocked"
  fi
}

# ─── runner detection (ordered: most specific first) ─────────────────────────

# Python: pytest is the conventional choice on Codvo backends.
if [[ -f "pytest.ini" || -f "pyproject.toml" ]] && grep -q -E '\[tool\.pytest|^\[pytest\]' pyproject.toml pytest.ini 2>/dev/null; then
  py="$(find_python)"
  if [[ -z "$py" ]]; then
    soft_fail "pytest configured but no Python interpreter found"
  fi
  if "$py" -m pytest --version >/dev/null 2>&1; then
    if [[ -n "${CODVO_TEST_FAST_ONLY:-}" ]]; then
      run_and_report "pytest" "$py" -m pytest -m "not slow" --no-header -q
    else
      run_and_report "pytest" "$py" -m pytest --no-header -q
    fi
  else
    soft_fail "pytest configured but not installed in selected interpreter"
  fi
fi

# Node: prefer package.json "test:fast" → "test" script.
if [[ -f "package.json" ]] && have node; then
  pkg_mgr=""
  if   [[ -f "pnpm-lock.yaml" ]] && have pnpm; then pkg_mgr="pnpm"
  elif [[ -f "yarn.lock"      ]] && have yarn; then pkg_mgr="yarn"
  elif have npm; then pkg_mgr="npm"
  fi

  if [[ -z "$pkg_mgr" ]]; then
    soft_fail "package.json present but no npm/yarn/pnpm available"
  fi

  test_script=""
  if [[ -n "${CODVO_TEST_FAST_ONLY:-}" ]] && node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['test:fast'] ? 0 : 1)" 2>/dev/null; then
    test_script="test:fast"
  elif node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)" 2>/dev/null; then
    test_script="test"
  fi

  if [[ -n "$test_script" ]]; then
    run_and_report "$pkg_mgr run $test_script" "$pkg_mgr" "run" "$test_script"
  else
    log_dim "package.json has no test script — skipping node tests"
  fi
fi

# Go
if [[ -f "go.mod" ]] && have go; then
  run_and_report "go test" go test ./...
fi

log_dim "no recognized test runner configured — skipping (set CODVO_SKIP_TESTS=1 to suppress)"
exit 0
