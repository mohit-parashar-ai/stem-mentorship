#!/usr/bin/env bash
# .claude/hooks/pre-commit-all.sh
# Master dispatcher. Runs all pre-commit-*.sh hooks in order, cheapest first.
# Called by .claude/hooks/git-hooks/pre-commit AND by Claude Code PreToolUse hook.
#
# Exit codes: 0 = all pass, 1 = one or more hooks hard-failed (commit BLOCKED)
# Soft-fails (missing tools, exit 1 from a hook) emit warnings but allow commit.

set -uo pipefail
HOOK_NAME="pre-commit"
source "$(dirname "$0")/lib/common.sh"

cd "$REPO_ROOT" || exit 1

# ─── hook execution order ────────────────────────────────────────────────────
# Ordered cheapest → slowest so a fast hard-fail short-circuits the expensive ones.
# Estimated times shown for reference; actual times vary by repo size.
HOOKS=(
  pre-commit-secrets.sh           # ~0.3s — block credentials/keys first, always
  pre-commit-anti-patterns.sh     # ~0.3s — console.log, hardcoded URLs
  pre-commit-file-length.sh       # ~0.2s — 400-line per-file cap (CLAUDE.md M-5)
  pre-commit-pr-size.sh           # ~0.3s — 400-line PR diff cap vs main (CLAUDE.md M-5)
  pre-commit-shellcheck.sh        # ~1s   — only fires on staged .sh files
  pre-commit-frontend-lint.sh     # ~1s   — biome/eslint on staged .ts/.tsx
  pre-commit-alembic-heads.sh     # ~1s   — only fires on staged alembic migrations
  pre-commit-coverage-ratchet.sh  # ~1s   — only fires on staged .py files
  pre-commit-sast.sh              # ~3s   — bandit + semgrep
  pre-commit-tests.sh             # varies — test suite (CLAUDE.md M-4); soft-fail if no runner
)

hard_failed=0
soft_failed=0
hooks_dir="$(dirname "$0")"
start_total=$(date +%s)

for hook in "${HOOKS[@]}"; do
  path="$hooks_dir/$hook"
  if [[ ! -f "$path" ]]; then
    log_dim "$hook not found — skipping"
    continue
  fi
  if [[ ! -x "$path" ]]; then
    chmod +x "$path"
  fi
  start=$(date +%s)
  "$path"
  rc=$?
  elapsed=$(( $(date +%s) - start ))
  case "$rc" in
    0) log_dim "  $hook ✓ (${elapsed}s)" ;;
    1) log_warn "  $hook soft-fail (missing tool) — install to enable"
       soft_failed=$(( soft_failed + 1 )) ;;
    *) log_fail "  $hook BLOCKED commit (rc=$rc)"
       hard_failed=$(( hard_failed + 1 )) ;;
  esac
done

total=$(( $(date +%s) - start_total ))

if [[ $hard_failed -gt 0 ]]; then
  log_fail "pre-commit blocked: $hard_failed check(s) failed (${total}s total)"
  exit 1
fi

if [[ $soft_failed -gt 0 ]]; then
  log_warn "$soft_failed tool(s) not installed — commit allowed, install to enable those checks"
fi

log_pass "pre-commit passed (${total}s)"
exit 0
