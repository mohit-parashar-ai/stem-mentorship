#!/usr/bin/env bash
# .claude/hooks/pre-commit-file-length.sh
# CLAUDE.md M-5: source files must stay within CODVO_FILE_LIMIT lines (default 400).
# Forces module decomposition and keeps diffs reviewable.
# Hard-fails on violation; skips generated, test, and migration files.

set -uo pipefail
HOOK_NAME="file-length"
source "$(dirname "$0")/lib/common.sh"

LIMIT="${CODVO_FILE_LIMIT:-400}"

src_files="$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '\.(ts|tsx|js|jsx|py|go|java|cs)$' \
  | grep -vE '/(node_modules|dist|build|\.venv|__pycache__|migrations?|alembic/versions|\.next|coverage|vendor)/' \
  | grep -vE '\.(test|spec|min)\.(ts|tsx|js|jsx)$' \
  | grep -vE '(\.d\.ts|generated|\.pb\.go|_pb2\.py)$' \
  || true)"

if [[ -z "$src_files" ]]; then
  log_dim "no source files in scope — skipping"
  exit 0
fi

failed=0
while IFS= read -r f; do
  [[ -z "$f" || ! -f "$f" ]] && continue
  lines="$(wc -l < "$f" | tr -d ' ')"
  if (( lines > LIMIT )); then
    log_fail "$f is $lines lines (limit: $LIMIT)"
    log_dim "  → split into modules; see .claude/references/code-patterns.md"
    failed=1
  fi
done <<< "$src_files"

[[ $failed -ne 0 ]] && hard_fail "file(s) exceed ${LIMIT}-line limit — split before committing"
ok "all staged source files within ${LIMIT}-line limit"
