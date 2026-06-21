#!/usr/bin/env bash
# .claude/hooks/lib/common.sh
# Shared helpers for Codvo Claude Code hooks.
# Sourced by all pre-commit-*.sh scripts. Not executable on its own.

set -u

# ─── colors / icons ──────────────────────────────────────────────────────────
if [[ -t 1 ]] && [[ -z "${NO_COLOR:-}" ]]; then
  C_RESET=$'\033[0m'
  C_RED=$'\033[31m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_BLUE=$'\033[34m'
  C_DIM=$'\033[2m'
else
  C_RESET=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BLUE=""; C_DIM=""
fi

# ─── logging ─────────────────────────────────────────────────────────────────
hook_name="${HOOK_NAME:-hook}"

log_info()  { printf "%s[%s]%s %s\n"   "$C_BLUE"   "$hook_name" "$C_RESET" "$*"; }
log_pass()  { printf "%s[%s]%s ✓ %s\n" "$C_GREEN"  "$hook_name" "$C_RESET" "$*"; }
log_warn()  { printf "%s[%s]%s ⚠ %s\n" "$C_YELLOW" "$hook_name" "$C_RESET" "$*" >&2; }
log_fail()  { printf "%s[%s]%s ✗ %s\n" "$C_RED"    "$hook_name" "$C_RESET" "$*" >&2; }
log_dim()   { printf "%s[%s] %s%s\n"   "$C_DIM"    "$hook_name" "$*"       "$C_RESET"; }

# ─── tool detection ──────────────────────────────────────────────────────────
have() { command -v "$1" >/dev/null 2>&1; }

# Find the right Python interpreter. Prefers a local .venv if one exists.
find_python() {
  for candidate in \
    "${REPO_ROOT}/.venv/bin/python" \
    "${REPO_ROOT}/backend/.venv/bin/python" \
    "${REPO_ROOT}/.venv/bin/python3"
  do
    [[ -x "$candidate" ]] && { echo "$candidate"; return; }
  done
  have python3 && { command -v python3; return; }
  have python  && { command -v python;  return; }
  echo ""
}

# ─── repo root ───────────────────────────────────────────────────────────────
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
export REPO_ROOT

# ─── staged-files helpers ────────────────────────────────────────────────────
# Returns newline-delimited list of staged files matching a grep -E pattern.
# Usage: staged_matching '\.py$'
staged_matching() {
  git diff --cached --name-only --diff-filter=ACM | grep -E "$1" || true
}

# Full scan override for CI (scans all tracked files, not just staged).
all_or_staged() {
  if [[ -n "${CODVO_HOOK_FULL_SCAN:-}" ]]; then
    git ls-files
  else
    git diff --cached --name-only --diff-filter=ACM
  fi
}

# ─── exit code contract ──────────────────────────────────────────────────────
# Every hook must exit with exactly one of:
#   0  → success — allow commit
#   1  → soft fail — tool not installed or no files in scope; warn but allow commit
#   2  → hard fail — real finding; BLOCK commit
soft_fail() { log_warn "$*"; exit 1; }
hard_fail() { log_fail "$*"; exit 2; }
ok()        { log_pass "$*"; exit 0; }

# Soft-fail with install hint if a required CLI tool is missing.
require_tool() {
  local tool="$1" hint="${2:-install it and re-run bash .claude/hooks/install.sh}"
  if ! have "$tool"; then
    log_warn "tool '$tool' not installed — $hint"
    log_warn "soft-fail: commit allowed; install tool to enable this check"
    exit 1
  fi
}
