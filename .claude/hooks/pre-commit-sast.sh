#!/usr/bin/env bash
# .claude/hooks/pre-commit-sast.sh
# Static analysis on staged source files.
# Python: bandit (HIGH/CRITICAL severity + HIGH confidence only)
# TypeScript/JS: semgrep if installed (optional but recommended)
# Soft-fails if tools not installed; hard-fails on real findings.

set -uo pipefail
HOOK_NAME="sast"
source "$(dirname "$0")/lib/common.sh"

py_files="$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '\.py$' \
  | grep -vE '/(tests?|migrations?|alembic/versions|\.venv|__pycache__)/' \
  || true)"

ts_files="$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '\.(ts|tsx|js|jsx)$' \
  | grep -vE '/(node_modules|dist|build|\.next|coverage|\.test\.|\.spec\.)/' \
  || true)"

if [[ -z "$py_files" && -z "$ts_files" ]]; then
  log_dim "no source files in scope — skipping"
  exit 0
fi

failed=0

# ─── bandit (Python) ─────────────────────────────────────────────────────────
if [[ -n "$py_files" ]]; then
  PY="$(find_python)"
  if [[ -z "$PY" ]]; then
    log_warn "no Python interpreter found — skipping bandit"
  elif "$PY" -c "import bandit" >/dev/null 2>&1; then
    file_count="$(echo "$py_files" | wc -l | tr -d ' ')"
    log_info "bandit on $file_count Python file(s)"
    # -lll = HIGH severity only; -iii = HIGH confidence only; -q = quiet output
    if ! $PY -m bandit -lll -iii -q $py_files 2>&1; then
      log_fail "bandit found HIGH-severity / HIGH-confidence issues"
      failed=1
    else
      log_pass "bandit clean"
    fi
  else
    log_warn "bandit not installed — soft-fail"
    log_warn "  Install: pip install bandit  (in your project venv)"
  fi
fi

# ─── semgrep (Python + TypeScript, optional) ─────────────────────────────────
all_files="${py_files}${py_files:+$'\n'}${ts_files}"
all_files="$(echo "$all_files" | grep -v '^$' || true)"

if [[ -n "$all_files" ]] && have semgrep; then
  file_count="$(echo "$all_files" | wc -l | tr -d ' ')"
  log_info "semgrep on $file_count file(s)"
  if ! semgrep --error --quiet --config=auto $all_files >/dev/null 2>&1; then
    log_fail "semgrep found findings"
    log_fail "  Re-run for details: semgrep --config=auto $all_files"
    failed=1
  else
    log_pass "semgrep clean"
  fi
else
  log_dim "semgrep not installed (optional) — brew install semgrep"
fi

[[ $failed -ne 0 ]] && hard_fail "SAST findings — fix before committing"
ok "SAST clean"
