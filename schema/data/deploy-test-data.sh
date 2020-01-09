#!/bin/bash
set -e

database=${PGDATABASE:-ggircs_dev}

# =============================================================================
# Usage:
# -----------------------------------------------------------------------------
usage() {
    cat << EOF
$0 [-d] [-p] [-s] [-h]

Upserts test data in the $database database, and deploys the schemas using sqitch if needed.
If run without the corresponding options, this script will deploy the swrs and portal schemas
if they do not exist, and then insert the portal test data.

Options

  -d, --drop-db
    Drops the $database database before deploying
  -s, --deploy-swrs-schema
    Redeploys the swrs schema and inserts the swrs test reports. This requires the .cas-ggircs submodule to be initialized
  -p, --deploy-portal-schema
    Redeploys the portal schema
  -h, --help
    Prints this message

EOF
}

if [ "$#" -gt 3 ]; then
    echo "Passed $# parameters. Expected 0 to 3."
    usage
    exit 1
fi

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname" > /dev/null

_psql() {
  user=${PGUSER:-$(whoami)}
  host=${PGHOST:-localhost}
  port=${PGPORT:-5432}
  psql -d "$database" -h "$host" -p "$port" -U "$user" -qtA --set ON_ERROR_STOP=1 "$@" 2>&1
}

dropdb() {
  echo "Drop the $database database if it exists"
  if psql -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$database'" | grep -q 1; then
    psql -d postgres -c "DROP DATABASE $database";
  fi
}

createdb() {
  echo "Create the $database database if it does not exist"
  if ! psql -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$database'" | grep -q 1; then
    psql -d postgres -c "CREATE DATABASE $database";
  fi
}

actions=()

sqitch_revert() {
  echo "Revert the $database database"
  if _psql -c "select 1 from pg_catalog.pg_namespace where nspname = 'sqitch'" | grep -q 1; then
    sqitch revert -y "$database" || return 0;
  fi
  return 0;
}

deploySwrs() {
  echo "Deploying the swrs schema to $database"
  if [ ! -f ../.cas-ggircs/sqitch.plan ]; then
    echo "Could not find sqitch plan in schema/.cas-ggircs."
    echo "Did you forget to init and/or update the submodule?"
    exit 1
  fi
  pushd ../.cas-ggircs
  sqitch_revert
  sqitch deploy "$database"
  popd
  _psql <<EOF
  insert into
    swrs_extract.ghgr_import (id, xml_file)
    overriding system value
  values
    (1,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_8614X.xml)'),
    (2,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_9822X.xml)'),
    (3,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_10255X.xml)'),
    (4,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_10271X.xml)'),
    (5,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_10692X.xml)'),
    (6,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_10759X.xml)'),
    (7,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_11033X.xml)'),
    (8,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_11233X.xml)'),
    (9,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_11266X.xml)'),
    (10,'$(sed -e "s/'/''/g" < ../.cas-ggircs/test/data/Report_11324X.xml)')
  on conflict(id) do update set xml_file=excluded.xml_file;
EOF

  _psql -c "select swrs_transform.load()"
}

deploySwrsIfNotExists() {
  _psql -c "select 1 from pg_catalog.pg_namespace where nspname = 'swrs'" | grep -q 1 || deploySwrs
  return 0
}

deployPortal() {
  deploySwrsIfNotExists
  echo "Deploying the portal schema to $database"
  pushd ..
  sqitch_revert
  sqitch deploy "$database"
  popd
}

deployPortalIfNotExists() {
  _psql -c "select 1 from pg_catalog.pg_namespace where nspname = 'ggircs_portal'" | grep -q 1 || deployPortal
  return 0
}

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -d | --drop-db )
    actions+=('dropdb' 'deploySwrs' 'deployPortal')
    ;;
  -p | --deploy-portal-schema )
    actions+=('deployPortal')
    ;;
  -s | --deploy-swrs-schema )
    actions+=('deploySwrs')
    ;;
  -h | --help )
    usage
    exit 0
    ;;
esac; shift; done

[[ " ${actions[*]} " =~ " dropdb " ]] && dropdb
createdb
[[ " ${actions[*]} " =~ " deploySwrs " ]] && deploySwrs
[[ " ${actions[*]} " =~ " deployPortal " ]] && deployPortal
deployPortalIfNotExists

_psql -f "./portal/reporting_year.sql"
_psql -f "./portal/form_json.sql"
_psql -f "./portal/ciip_application_wizard.sql"
_psql -f "./portal/fuel.sql"
_psql -f "./portal/product_form.sql"
_psql -f "./portal/product.sql"
_psql -f "./portal/user.sql"
_psql -f "./portal/benchmark.sql"
_psql -f "./portal/organisation_and_facility.sql"
_psql -f "./portal/gas.sql"
_psql -f "./portal/emission_gas.sql"
_psql -f "./portal/application.sql"
_psql -f "./portal/certification_url.sql"
_psql -f "./portal/application_revision.sql"
_psql -f "./portal/application_revision_status.sql"
_psql -f "./portal/form_result.sql"
