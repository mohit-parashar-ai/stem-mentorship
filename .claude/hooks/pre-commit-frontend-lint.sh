#!/usr/bin/env bash
# .claude/hooks/pre-commit-frontend-lint.sh
# Lint staged TypeScript/TSX files.
# Tries Biome first (preferred); falls back to ESLint if Biome is not found.
# Soft-fails if neither linter is installed. Hard-fails on lint errors.

set -uo pipefail
HOOK_NAME="frontend-lint"
source "$(dirname "$0")/lib/common.sh"

staged_ts="$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' \
  | grep -vE '/(node_modules|dist|build|\.next|coverage)/' \
  || true)"

if [[ -z "$staged_ts" ]]; then
  log_dim "no TypeScript files staged — skipping"
  exit 0
fi

failed=0

# ─── try Biome (preferred) ───────────────────────────────────────────────────
BIOME_BIN=""
for candidate in \
  "$REPO_ROOT/node_modules/.bin/biome" \
  "$REPO_ROOT/frontend/node_modules/.bin/biome"
do
  [[ -x "$candidate" ]] && { BIOME_BIN="$candidate"; break; }
done

if [[ -n "$BIOME_BIN" ]]; then
  log_info "running biome on $(echo "$staged_ts" | wc -l | tr -d ' ') file(s)"
  while IFS= read -r f; do
    [[ -z "$f" || ! -f "$REPO_ROOT/$f" ]] && continue
    if ! "$BIOME_BIN" check "$REPO_ROOT/$f" --no-errors-on-unmatched 2>&1; then
      failed=$(( failed + 1 ))
    fi
  done <<< "$staged_ts"
  [[ $failed -gt 0 ]] && hard_fail "$failed file(s) failed biome — fix: npx biome check --apply ."
  ok "all staged TypeScript files pass biome"
fi

# ─── fall back to ESLint ─────────────────────────────────────────────────────
ESLINT_BIN=""
for candidate in \
  "$REPO_ROOT/node_modules/.bin/eslint" \
  "$REPO_ROOT/frontend/node_modules/.bin/eslint"
do
  [[ -x "$candidate" ]] && { ESLINT_BIN="$candidate"; break; }
done

if [[ -n "$ESLINT_BIN" ]]; then
  log_info "running eslint on staged TypeScript files"
  files_arr=()
  while IFS= read -r f; do
    [[ -z "$f" || ! -f "$REPO_ROOT/$f" ]] && continue
    files_arr+=("$REPO_ROOT/$f")
  done <<< "$staged_ts"
  if ! "$ESLINT_BIN" "${files_arr[@]}" 2>&1; then
    hard_fail "eslint found errors — fix before committing"
  fi
  ok "all staged TypeScript files pass eslint"
fi

log_warn "neither biome nor eslint found — soft-fail"
log_warn "  Install biome: npm install --save-dev @biomejs/biome"
log_warn "  Install eslint: npm install --save-dev eslint"
exit 1
