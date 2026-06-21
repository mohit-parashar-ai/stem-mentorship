#!/usr/bin/env bash
# .claude/hooks/pre-commit-shellcheck.sh
# Run shellcheck on staged .sh files — including hook scripts themselves.
# Hard-fails on error/warning severity. Soft-fails if shellcheck not installed.

set -uo pipefail
HOOK_NAME="shellcheck"
source "$(dirname "$0")/lib/common.sh"

if ! have shellcheck; then
  log_warn "shellcheck not installed — soft-fail"
  log_warn "  Install: brew install shellcheck"
  exit 1
fi

staged_sh="$(git diff --cached --name-only --diff-filter=ACM | grep '\.sh$' || true)"

if [[ -z "$staged_sh" ]]; then
  log_dim "no .sh files staged — skipping"
  exit 0
fi

failed=0
while IFS= read -r f; do
  [[ -z "$f" || ! -f "$REPO_ROOT/$f" ]] && continue
  # SC1090/SC1091: sourcing dynamic paths — acceptable in hook scripts
  # SC2034: unused variables — false positives from sourced lib files
  if ! shellcheck --severity=warning --exclude=SC1090,SC1091,SC2034 "$REPO_ROOT/$f"; then
    log_fail "shellcheck failed on $f"
    failed=$(( failed + 1 ))
  fi
done <<< "$staged_sh"

[[ $failed -gt 0 ]] && hard_fail "$failed file(s) failed shellcheck — fix before committing"
ok "all staged shell scripts pass shellcheck"
