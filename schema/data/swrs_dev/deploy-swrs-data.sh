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

  Options

  --load-test
    Deploys load-testing data in the swrs schema
  --dev
    Deploys dev data in the swrs schema
  --help
    Prints this message

EOF
}

if [ "$#" != 1 ]; then
    echo "Passed $# parameters. Expected 1"
    usage
    exit 1
fi

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname" > /dev/null

_psql() {
  psql -d "$database" -h "$host" -p "$port" -U "$user" -qtA --set ON_ERROR_STOP=1 "$@" 2>&1
}

deployDevData() {
  _psql -f "./dev_data.sql"
  return 0;
}

deployLoadTestingData() {
  _psql -f "./load_testing_data.sql"
  return 0;
}

if [ "$1" == '--load-test' ]; then
  echo "Deploying Load Testing Data..."
  deployLoadTestingData
fi

if [ "$1" == '--dev' ]; then
  echo "Deploying Dev Data..."
  deployDevData
fi

if [ "$1" == '--help' ]; then
  usage
fi
