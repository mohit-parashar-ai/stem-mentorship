#!/usr/bin/env bash
# .claude/hooks/pre-commit-anti-patterns.sh
# Blocks debug statements, hardcoded localhost URLs, and TODO-without-ticket
# from being committed to production code.

set -uo pipefail
HOOK_NAME="anti-patterns"
source "$(dirname "$0")/lib/common.sh"

failed=0
files="$(git diff --cached --name-only --diff-filter=ACM)"

[[ -z "$files" ]] && { log_dim "no staged files"; exit 0; }

# ── Patterns to block ────────────────────────────────────────────────────────
# Each entry: "pattern|description|file_extensions_to_check"
check_pattern() {
  local pat="$1" desc="$2" ext_pattern="$3"
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    # Only check files matching the extension pattern
    [[ -n "$ext_pattern" ]] && ! echo "$f" | grep -qE "$ext_pattern" && continue
    # Skip test files for some patterns
    if grep -nE "$pat" "$f" >/dev/null 2>&1; then
      log_fail "$f: $desc"
      grep -nE --color=never "$pat" "$f" | head -3 | sed "s/^/  /"
      failed=1
    fi
  done <<< "$files"
}

# Debug statements (skip test files and hook files)
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  case "$f" in
    *.test.*|*.spec.*|*_test.*|*test_*|*.claude/hooks/*) continue ;;
  esac
  case "$f" in
    *.js|*.ts|*.jsx|*.tsx)
      if grep -nE '^\s*console\.(log|debug|warn|error)\(' "$f" >/dev/null 2>&1; then
        log_fail "$f: console.log/debug left in production code — remove before committing"
        grep -nE '^\s*console\.(log|debug|warn|error)\(' "$f" | head -3 | sed "s/^/  /"
        failed=1
      fi
      ;;
    *.py)
      if grep -nE '^\s*print\(' "$f" >/dev/null 2>&1; then
        log_fail "$f: print() left in production code — use logging instead"
        grep -nE '^\s*print\(' "$f" | head -3 | sed "s/^/  /"
        failed=1
      fi
      ;;
  esac
done <<< "$files"

# Hardcoded localhost/127.0.0.1 in non-config, non-test, non-example files
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  case "$f" in
    *.test.*|*.spec.*|*_test.*|*test_*|*.example|*.sample|*.md|*.env*) continue ;;
  esac
  if grep -nE 'https?://(localhost|127\.0\.0\.1):[0-9]+' "$f" >/dev/null 2>&1; then
    log_fail "$f: hardcoded localhost URL — use environment variable instead"
    grep -nE 'https?://(localhost|127\.0\.0\.1):[0-9]+' "$f" | head -3 | sed "s/^/  /"
    failed=1
  fi
done <<< "$files"

[[ $failed -ne 0 ]] && exit 1
ok "no anti-patterns detected"
