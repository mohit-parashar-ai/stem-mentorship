#!/usr/bin/env bash
# Enforces Conventional Commits: type(scope): description
# Called as a commit-msg hook with the message file as $1
set -uo pipefail
HOOK_NAME="commit-msg"
source "$(dirname "$0")/lib/common.sh"

MSG_FILE="${1:-}"
[[ -z "$MSG_FILE" || ! -f "$MSG_FILE" ]] && { log_dim "no msg file — skipping"; exit 0; }

MSG=$(head -1 "$MSG_FILE")
PATTERN='^(feat|fix|refactor|test|docs|chore|perf|ci|build)(\([a-zA-Z0-9_/-]+\))?: .{1,72}$'

if ! echo "$MSG" | grep -qE "$PATTERN"; then
  log_fail "Commit message does not follow Conventional Commits format."
  echo "" >&2
  echo "  Expected: type(scope): short description  (max 72 chars)" >&2
  echo "  Got:      $MSG" >&2
  echo "" >&2
  echo "  Types: feat | fix | refactor | test | docs | chore | perf | ci | build" >&2
  echo "  Example: feat(auth): add SSO login endpoint" >&2
  echo "  Example: fix(api): handle null user on session refresh" >&2
  exit 1
fi
ok "commit message format valid"
