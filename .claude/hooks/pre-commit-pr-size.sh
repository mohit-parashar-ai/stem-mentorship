#!/usr/bin/env bash
# .claude/hooks/pre-commit-pr-size.sh
# CLAUDE.md M-5: PR diff against main must stay within CODVO_PR_SIZE_LIMIT
# lines (default 400). Hard-fails when a feature branch accumulates more.
# Skips: main itself, branches without an upstream, generated / vendor / lock files.
# Bypass: CODVO_PR_SIZE_OVERRIDE=1 (require justification in PR description).

set -uo pipefail
HOOK_NAME="pr-size"
source "$(dirname "$0")/lib/common.sh"

LIMIT="${CODVO_PR_SIZE_LIMIT:-400}"

# Skip on main — this hook only applies to feature branches.
current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
if [[ "$current_branch" == "main" || "$current_branch" == "master" || "$current_branch" == "HEAD" ]]; then
  log_dim "on $current_branch — skipping (PR-size check is for feature branches)"
  exit 0
fi

# Find merge-base with main. If main doesn't exist locally, skip rather than guess.
if ! git rev-parse --verify main >/dev/null 2>&1; then
  log_dim "no local 'main' branch — skipping"
  exit 0
fi

merge_base="$(git merge-base HEAD main 2>/dev/null || echo "")"
if [[ -z "$merge_base" ]]; then
  log_dim "cannot compute merge-base with main — skipping"
  exit 0
fi

# Honor explicit override.
if [[ -n "${CODVO_PR_SIZE_OVERRIDE:-}" ]]; then
  log_warn "CODVO_PR_SIZE_OVERRIDE set — bypassing PR-size check (justify in PR description)"
  exit 0
fi

# Count lines changed in the branch vs merge-base, excluding non-source artifacts.
# We include the STAGED diff as well, since this hook runs pre-commit and the
# new commit will land on top.
exclude_globs=(
  ':!**/node_modules/**' ':!**/dist/**' ':!**/build/**' ':!**/.venv/**'
  ':!**/__pycache__/**' ':!**/alembic/versions/**' ':!**/migrations/**'
  ':!**/.next/**' ':!**/coverage/**' ':!**/vendor/**'
  ':!**/package-lock.json' ':!**/yarn.lock' ':!**/pnpm-lock.yaml'
  ':!**/poetry.lock' ':!**/Pipfile.lock' ':!**/go.sum'
  ':!**/*.min.js' ':!**/*.min.css' ':!**/*.snap'
  ':!**/*.d.ts' ':!**/*.pb.go' ':!**/*_pb2.py'
)

# Sum committed-since-base + staged-now.
committed_stat="$(git diff --numstat "$merge_base" HEAD -- "${exclude_globs[@]}" 2>/dev/null || true)"
staged_stat="$(git diff --cached --numstat -- "${exclude_globs[@]}" 2>/dev/null || true)"

# numstat columns: added  deleted  file. Some binary files print "-  -".
sum_lines() {
  awk '{ if ($1 ~ /^[0-9]+$/) a+=$1; if ($2 ~ /^[0-9]+$/) d+=$2 } END { print (a+d)+0 }'
}

committed_lines="$(echo "$committed_stat" | sum_lines)"
staged_lines="$(echo "$staged_stat"      | sum_lines)"
total=$(( committed_lines + staged_lines ))

if (( total > LIMIT )); then
  log_fail "PR diff vs main = $total lines (limit: $LIMIT)"
  log_dim "  committed: $committed_lines | staged: $staged_lines"
  log_dim "  → split into a smaller slice, or set CODVO_PR_SIZE_OVERRIDE=1 with justification"
  log_dim "  reference: .claude/references/branch-policy.md § PR size guidance"
  hard_fail "PR exceeds ${LIMIT}-line cap — split before continuing"
fi

ok "PR diff vs main = $total lines (under ${LIMIT}-line cap)"
