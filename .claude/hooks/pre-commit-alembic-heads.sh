#!/usr/bin/env bash
# .claude/hooks/pre-commit-migration-safety.sh
# (kept as pre-commit-alembic-heads.sh for dispatcher compatibility)
#
# Framework-agnostic migration safety check. Detects which migration tool is
# in use and applies the right conflict/head check for that tool.
#
# Supported frameworks (auto-detected from repo structure):
#   Alembic   (Python/SQLAlchemy)  → multiple heads break `alembic upgrade head`
#   Prisma    (TypeScript)         → migration drift and missing lock entries
#   TypeORM   (TypeScript)         → duplicate timestamps cause wrong order
#   Knex      (Node.js)            → duplicate timestamps silently skip migrations
#   Django    (Python)             → multiple leaf migrations per app cause conflicts
#   Flyway    (SQL)                → duplicate version numbers fail on deploy
#
# Skips entirely if no migration files are staged or no known framework is found.
# Soft-fails (warns, allows commit) if framework detected but tool not installed.
# Hard-fails (blocks commit) on real conflicts.

set -uo pipefail
HOOK_NAME="migration-safety"
source "$(dirname "$0")/lib/common.sh"

# Only run when migration-related files are staged
STAGED="$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || true)"
if [[ -z "$STAGED" ]]; then
  log_dim "no staged files — skipping"
  exit 0
fi

migration_files="$(echo "$STAGED" | grep -iE \
  '(migration|migrate|alembic/versions|prisma/migrations|flyway|liquibase)' \
  || true)"

if [[ -z "$migration_files" ]]; then
  log_dim "no migration files staged — skipping"
  exit 0
fi

failed=0
checked=0

# ─── Alembic (Python / SQLAlchemy) ───────────────────────────────────────────
# Risk: two engineers branch from the same head → two competing heads.
# `alembic upgrade head` becomes ambiguous; production deploy fails.
ALEMBIC_DIR=""
for candidate in \
  "$REPO_ROOT/alembic" \
  "$REPO_ROOT/backend/alembic" \
  "$REPO_ROOT/db/alembic"
do
  [[ -d "$candidate" ]] && { ALEMBIC_DIR="$candidate"; break; }
done

if [[ -n "$ALEMBIC_DIR" ]] && echo "$migration_files" | grep -q 'alembic/versions'; then
  checked=$(( checked + 1 ))
  log_info "Alembic: checking for multiple heads"
  ALEMBIC_CMD=""
  if have alembic; then
    ALEMBIC_CMD="alembic"
  else
    PY="$(find_python)"
    [[ -n "$PY" ]] && "$PY" -c "import alembic" >/dev/null 2>&1 && ALEMBIC_CMD="$PY -m alembic"
  fi

  if [[ -z "$ALEMBIC_CMD" ]]; then
    log_warn "alembic not found — soft-fail (install in your venv)"
  else
    head_count="$(cd "$(dirname "$ALEMBIC_DIR")" && $ALEMBIC_CMD heads 2>/dev/null \
      | grep -c "(head)" || echo "0")"
    if (( head_count > 1 )); then
      log_fail "multiple Alembic heads ($head_count) — deployment will fail"
      log_fail "  Fix: cd $(dirname "$ALEMBIC_DIR") && alembic merge heads -m 'merge_heads'"
      log_fail "  Then stage the new merge migration file."
      failed=1
    else
      log_pass "Alembic: single head — safe"
    fi
  fi
fi

# ─── Prisma (TypeScript / Node.js) ───────────────────────────────────────────
# Risk: migration files added without running `prisma migrate dev`, leaving the
# migration_lock out of sync. Prisma detects this and blocks `migrate deploy`.
PRISMA_SCHEMA=""
for candidate in \
  "$REPO_ROOT/prisma/schema.prisma" \
  "$REPO_ROOT/backend/prisma/schema.prisma"
do
  [[ -f "$candidate" ]] && { PRISMA_SCHEMA="$candidate"; break; }
done

if [[ -n "$PRISMA_SCHEMA" ]] && echo "$migration_files" | grep -q 'prisma/migrations'; then
  checked=$(( checked + 1 ))
  log_info "Prisma: checking migration lock consistency"
  PRISMA_BIN=""
  for candidate in \
    "$REPO_ROOT/node_modules/.bin/prisma" \
    "$REPO_ROOT/backend/node_modules/.bin/prisma"
  do
    [[ -x "$candidate" ]] && { PRISMA_BIN="$candidate"; break; }
  done

  if [[ -z "$PRISMA_BIN" ]]; then
    log_warn "prisma CLI not found — soft-fail (run: npm install)"
  else
    PRISMA_DIR="$(dirname "$PRISMA_SCHEMA")"
    if ! (cd "$(dirname "$PRISMA_DIR")" && "$PRISMA_BIN" migrate status 2>&1 \
        | grep -qv "Database schema is up to date"); then
      log_warn "Prisma: run 'prisma migrate dev' before committing migration files"
    else
      log_pass "Prisma: migration lock consistent"
    fi
  fi
fi

# ─── TypeORM migrations ───────────────────────────────────────────────────────
# Risk: two engineers create migrations with the same or reversed timestamps.
# TypeORM runs them alphabetically; wrong order corrupts schema.
TYPEORM_DIR=""
for candidate in \
  "$REPO_ROOT/src/migrations" \
  "$REPO_ROOT/migrations" \
  "$REPO_ROOT/backend/src/migrations"
do
  [[ -d "$candidate" ]] && { TYPEORM_DIR="$candidate"; break; }
done

# Only trigger for TypeORM-style timestamp migrations (not Alembic, not Prisma)
if [[ -n "$TYPEORM_DIR" ]] && echo "$migration_files" | grep -qE '[0-9]{13}.*\.(ts|js)$'; then
  checked=$(( checked + 1 ))
  log_info "TypeORM: checking for duplicate migration timestamps"
  dupes="$(find "$TYPEORM_DIR" -maxdepth 1 -type f -name '[0-9]*' -print0 2>/dev/null \
    | xargs -0 -I{} basename {} \
    | awk -F'-' '{print $1}' \
    | sort | uniq -d || true)"
  if [[ -n "$dupes" ]]; then
    log_fail "duplicate TypeORM migration timestamps detected:"
    echo "$dupes" | sed 's/^/  /'
    log_fail "  Two migrations with the same timestamp will run in wrong order."
    log_fail "  Rename one: use a timestamp 1ms later."
    failed=1
  else
    log_pass "TypeORM: no duplicate timestamps"
  fi
fi

# ─── Knex migrations ──────────────────────────────────────────────────────────
# Risk: same as TypeORM — duplicate timestamps mean one migration silently skips.
KNEX_DIR=""
for candidate in \
  "$REPO_ROOT/migrations" \
  "$REPO_ROOT/db/migrations" \
  "$REPO_ROOT/database/migrations"
do
  # Knex migrations: JS/TS files with timestamp prefix, no framework-specific subdirs
  if [[ -d "$candidate" ]] && [[ -z "$TYPEORM_DIR" ]]; then
    KNEX_DIR="$candidate"; break
  fi
done

if [[ -n "$KNEX_DIR" ]] && echo "$migration_files" | grep -qE 'migrations/[0-9]{14}.*\.(js|ts)$'; then
  checked=$(( checked + 1 ))
  log_info "Knex: checking for duplicate migration timestamps"
  dupes="$(find "$KNEX_DIR" -maxdepth 1 -type f -name '[0-9]*' -print0 2>/dev/null \
    | xargs -0 -I{} basename {} \
    | awk -F'_' '{print $1}' \
    | sort | uniq -d || true)"
  if [[ -n "$dupes" ]]; then
    log_fail "duplicate Knex migration timestamps: $dupes"
    log_fail "  Regenerate one migration with a different timestamp."
    failed=1
  else
    log_pass "Knex: no duplicate timestamps"
  fi
fi

# ─── Django migrations ────────────────────────────────────────────────────────
# Risk: multiple leaf migrations in the same app means `manage.py migrate` is
# non-deterministic. Django detects this and raises an error.
if echo "$migration_files" | grep -qE '[a-zA-Z0-9_]+/migrations/[0-9]{4}_.*\.py$'; then
  checked=$(( checked + 1 ))
  log_info "Django: checking for multiple leaf migrations per app"
  PY="$(find_python)"
  if [[ -z "$PY" ]]; then
    log_warn "no Python interpreter — soft-fail"
  else
    # Find apps with more than one leaf migration (no migration that depends on them)
    leaf_issues="$("$PY" - "$REPO_ROOT" <<'PY' 2>/dev/null || true
import sys, os, ast, pathlib

repo = pathlib.Path(sys.argv[1])
issues = []

for mig_dir in repo.rglob("migrations"):
    if "__pycache__" in str(mig_dir):
        continue
    app = mig_dir.parent.name
    deps_of = {}  # migration → list of migrations that depend on it
    all_migrations = {}

    for f in sorted(mig_dir.glob("[0-9]*.py")):
        name = f.stem
        all_migrations[name] = []
        try:
            tree = ast.parse(f.read_text())
            for node in ast.walk(tree):
                if isinstance(node, ast.Assign):
                    for t in node.targets:
                        if isinstance(t, ast.Name) and t.id == "dependencies":
                            for elt in ast.walk(node.value):
                                if isinstance(elt, ast.Constant) and isinstance(elt.value, str):
                                    dep = elt.value
                                    deps_of.setdefault(dep, []).append(name)
        except Exception:
            pass

    leaves = [m for m in all_migrations if m not in deps_of]
    if len(leaves) > 1:
        issues.append(f"  {app}: {len(leaves)} leaves — {', '.join(leaves)}")

for issue in issues:
    print(issue)
PY
)"
    if [[ -n "$leaf_issues" ]]; then
      log_fail "Django: multiple leaf migrations detected (manage.py migrate will fail):"
      echo "$leaf_issues"
      log_fail "  Fix: python manage.py makemigrations --merge"
      failed=1
    else
      log_pass "Django: no leaf migration conflicts"
    fi
  fi
fi

# ─── Flyway / Liquibase (SQL version files) ──────────────────────────────────
# Risk: duplicate version numbers. Flyway/Liquibase checksums the version and
# errors on first conflict. `V2__add_column.sql` and `V2__another.sql` both fail.
if echo "$migration_files" | grep -qE '\.(sql|xml|yaml|json)$'; then
  SQL_DIRS=()
  for candidate in \
    "$REPO_ROOT/db/migrations" \
    "$REPO_ROOT/flyway" \
    "$REPO_ROOT/liquibase" \
    "$REPO_ROOT/migrations"
  do
    [[ -d "$candidate" ]] && SQL_DIRS+=("$candidate")
  done

  for sql_dir in "${SQL_DIRS[@]:-}"; do
    [[ -z "${sql_dir:-}" ]] && continue
    dupes="$(find "$sql_dir" -maxdepth 1 -type f \( -name 'V[0-9]*' -o -name 'v[0-9]*' \) -print0 2>/dev/null \
      | xargs -0 -I{} basename {} \
      | sed 's/__.*$//' \
      | sort | uniq -d || true)"
    if [[ -n "$dupes" ]]; then
      checked=$(( checked + 1 ))
      log_fail "duplicate Flyway/Liquibase version numbers in $sql_dir: $dupes"
      log_fail "  Rename one migration to use a unique version number."
      failed=1
    fi
  done
  [[ ${#SQL_DIRS[@]} -gt 0 && $checked -gt 0 ]] && log_pass "Flyway/Liquibase: no duplicate versions"
fi

# ─── result ──────────────────────────────────────────────────────────────────
if [[ $checked -eq 0 ]]; then
  log_dim "migration files staged but no known framework detected — skipping conflict check"
  log_dim "  Supported: Alembic, Prisma, TypeORM, Knex, Django, Flyway, Liquibase"
  exit 0
fi

[[ $failed -ne 0 ]] && hard_fail "migration conflict detected — resolve before committing"
ok "migration safety: no conflicts ($checked framework(s) checked)"
