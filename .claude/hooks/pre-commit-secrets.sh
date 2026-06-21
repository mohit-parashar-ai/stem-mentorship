#!/usr/bin/env bash
# Blocks API keys, .env files, PATs, JWTs, and PEM keys from being committed.
set -uo pipefail
HOOK_NAME="secrets"
source "$(dirname "$0")/lib/common.sh"

PATTERNS=(
  'sk-ant-[A-Za-z0-9_-]{20,}'
  'sk-[A-Za-z0-9]{20,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  'ghp_[A-Za-z0-9]{30,}'
  'AKIA[0-9A-Z]{16}'
  'AIza[0-9A-Za-z_-]{35}'
  '-----BEGIN (RSA|OPENSSH|PRIVATE) KEY-----'
  'eyJhbGciOi[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}'
  'Basic [A-Za-z0-9+/]{20,}={0,2}'
  'Bearer [A-Za-z0-9_\-\.]{30,}'
)

failed=0
files="$(git diff --cached --name-only --diff-filter=ACM)"
[[ -z "$files" ]] && { log_dim "no staged files"; exit 0; }

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  case "$f" in *.pyc|*.png|*.jpg|*.jpeg|*.pdf|*.gz|*.zip) continue ;; esac
  case "$f" in .claude/hooks/pre-commit-secrets.sh|*.example|*.sample|*.template) continue ;; esac
  for pat in "${PATTERNS[@]}"; do
    if grep -nE "$pat" "$f" >/dev/null 2>&1; then
      log_fail "$f matches secret pattern: $pat"
      grep -nE --color=never "$pat" "$f" | head -3 | sed "s/^/  /"
      failed=1
    fi
  done
done <<< "$files"

if echo "$files" | grep -qE '(^|/)\.env$'; then
  hard_fail ".env staged for commit — never commit .env files. Add to .gitignore."
fi

[[ $failed -ne 0 ]] && hard_fail "Secrets detected. Rotate exposed credentials before committing."
ok "no secrets detected"
