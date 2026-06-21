#!/usr/bin/env bash
# .claude/hooks/weekly-dependency-audit.sh
# Scans Python and Node.js dependencies for known CVEs and banned licenses.
# Designed for weekly CI/cron, NOT pre-commit (too slow for per-commit).
# Run manually: bash .claude/hooks/weekly-dependency-audit.sh
# Add to Azure Pipelines as a scheduled weekly pipeline.

set -uo pipefail
HOOK_NAME="dependency-audit"
source "$(dirname "$0")/lib/common.sh"

failed=0

# ─── Python: pip-audit ───────────────────────────────────────────────────────
REQ_FILE=""
for candidate in \
  "$REPO_ROOT/requirements.txt" \
  "$REPO_ROOT/backend/requirements.txt" \
  "$REPO_ROOT/requirements/base.txt"
do
  [[ -f "$candidate" ]] && { REQ_FILE="$candidate"; break; }
done

if [[ -n "$REQ_FILE" ]]; then
  if have pip-audit; then
    log_info "pip-audit on $REQ_FILE"
    if ! pip-audit --strict -r "$REQ_FILE" 2>&1; then
      log_fail "pip-audit: HIGH/CRITICAL vulnerabilities found — check output above"
      failed=1
    else
      log_pass "pip-audit: no known CVEs"
    fi
  else
    log_warn "pip-audit not installed — install: pipx install pip-audit"
  fi
fi

# ─── Node.js: npm audit ──────────────────────────────────────────────────────
PKG_JSON=""
for candidate in \
  "$REPO_ROOT/package.json" \
  "$REPO_ROOT/frontend/package.json"
do
  [[ -f "$candidate" ]] && { PKG_JSON="$candidate"; break; }
done

if [[ -n "$PKG_JSON" ]] && have npm; then
  PKG_DIR="$(dirname "$PKG_JSON")"
  log_info "npm audit in $PKG_DIR"
  if ! (cd "$PKG_DIR" && npm audit --omit=dev --audit-level=high 2>&1); then
    log_fail "npm audit: HIGH/CRITICAL vulnerabilities found"
    failed=1
  else
    log_pass "npm audit: no HIGH/CRITICAL CVEs"
  fi
fi

# ─── Python: license check — block GPL/AGPL/SSPL ────────────────────────────
PY="$(find_python)"
if [[ -n "$PY" ]] && "$PY" -c "import pip_licenses" >/dev/null 2>&1; then
  log_info "license check (blocking GPL/AGPL/SSPL)"
  banned="$("$PY" -m piplicenses --format=plain --with-license-file 2>/dev/null \
              | awk 'NR>1 && /(GPL|AGPL|SSPL)/ && !/(LGPL)/ {print "  " $0}' || true)"
  if [[ -n "$banned" ]]; then
    log_fail "banned licenses detected (GPL/AGPL/SSPL — incompatible with commercial use):"
    echo "$banned"
    log_fail "  Review each dependency. Replace or get legal sign-off before shipping."
    failed=1
  else
    log_pass "no banned licenses"
  fi
else
  log_dim "pip-licenses not installed (optional) — pipx install pip-licenses"
fi

# ─── summary ─────────────────────────────────────────────────────────────────
if [[ $failed -ne 0 ]]; then
  hard_fail "dependency audit found issues — review above, update dependencies, write to ESCALATION_NEEDED.md if remediation needs approval"
fi

ok "dependency audit clean"
