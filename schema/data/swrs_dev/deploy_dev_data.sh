#!/bin/bash
set -euo pipefail

database=${PGDATABASE:-ciip_portal_dev}
user=${PGUSER:-$(whoami)}
host=${PGHOST:-localhost}
port=${PGPORT:-5432}

# =============================================================================
# Usage:
# -----------------------------------------------------------------------------
usage() {
    cat << EOF
$0

Truncates all existing data in the swrs schema & deploys dev data for every year 2018-2025.

EOF
}

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname" > /dev/null

_psql() {
  psql -d "$database" -h "$host" -p "$port" -U "$user" -qtA --set ON_ERROR_STOP=1 "$@" 2>&1
}

deployDevData() {
  _psql -f "./dev_data.sql"
  return 0;
}

deployDevData
