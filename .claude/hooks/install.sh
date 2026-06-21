#!/usr/bin/env bash
# .claude/hooks/install.sh
# One-time installer. Wires the full hook chain into git.
# Run from repo root: bash .claude/hooks/install.sh

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$REPO_ROOT/.claude/hooks"
GIT_HOOKS_DIR="$REPO_ROOT/.claude/hooks/git-hooks"

echo "[install] making all hook scripts executable"
chmod +x "$HOOKS_DIR"/*.sh 2>/dev/null || true
chmod +x "$HOOKS_DIR/lib"/*.sh 2>/dev/null || true

echo "[install] creating .claude/hooks/git-hooks/"
mkdir -p "$GIT_HOOKS_DIR"

# pre-commit → runs the full pre-commit-all.sh chain
cat > "$GIT_HOOKS_DIR/pre-commit" << 'EOF'
#!/usr/bin/env bash
exec "$(git rev-parse --show-toplevel)/.claude/hooks/pre-commit-all.sh" "$@"
EOF
chmod +x "$GIT_HOOKS_DIR/pre-commit"

# commit-msg → validates commit message format (Conventional Commits)
cat > "$GIT_HOOKS_DIR/commit-msg" << 'EOF'
#!/usr/bin/env bash
exec "$(git rev-parse --show-toplevel)/.claude/hooks/pre-commit-commitmsg.sh" "$@"
EOF
chmod +x "$GIT_HOOKS_DIR/commit-msg"

# pre-push → dependency audit (only when CODVO_PRE_PUSH_SCAN=1 is set)
cat > "$GIT_HOOKS_DIR/pre-push" << 'EOF'
#!/usr/bin/env bash
# Dependency audit on push. Enable by setting CODVO_PRE_PUSH_SCAN=1 in ~/.zshrc.
if [[ "${CODVO_PRE_PUSH_SCAN:-0}" == "1" ]]; then
  exec "$(git rev-parse --show-toplevel)/.claude/hooks/weekly-dependency-audit.sh" "$@"
fi
exit 0
EOF
chmod +x "$GIT_HOOKS_DIR/pre-push"

echo "[install] pointing git core.hooksPath to .claude/hooks/git-hooks"
git config core.hooksPath .claude/hooks/git-hooks

echo ""
echo "✓ Hooks installed."
echo ""
echo "What runs and when:"
echo "  git commit  → pre-commit-all.sh dispatcher:"
echo "                  ├─ pre-commit-secrets.sh          (always — credentials/keys)"
echo "                  ├─ pre-commit-anti-patterns.sh    (always — console.log, hardcoded URLs)"
echo "                  ├─ pre-commit-file-length.sh      (always — 400-line source file cap)"
echo "                  ├─ pre-commit-shellcheck.sh       (only if .sh files staged)"
echo "                  ├─ pre-commit-frontend-lint.sh    (only if .ts/.tsx staged)"
echo "                  ├─ pre-commit-alembic-heads.sh    (only if migration files staged)"
echo "                  ├─ pre-commit-coverage-ratchet.sh (only if .py files staged)"
echo "                  └─ pre-commit-sast.sh             (bandit + semgrep)"
echo "                commit-msg hook:"
echo "                  └─ pre-commit-commitmsg.sh        (Conventional Commits format)"
echo "  git push    → weekly-dependency-audit.sh          (only if CODVO_PRE_PUSH_SCAN=1)"
echo "  weekly/CI   → weekly-dependency-audit.sh          (manual or scheduled)"
echo ""
echo "Claude Code sessions fire the same pre-commit chain via PreToolUse hook in .claude/settings.json"
echo ""
echo "Optional env vars (add to ~/.zshrc):"
echo "  CODVO_PRE_PUSH_SCAN=1        → run dependency audit on every git push"
echo "  CODVO_FILE_LIMIT=300         → stricter file length cap (default: 400)"
echo "  CODVO_COVERAGE_DRIFT_BPS=100 → tighter coverage ratchet (default: 200 bps)"
echo ""
echo "To uninstall: git config --unset core.hooksPath"
