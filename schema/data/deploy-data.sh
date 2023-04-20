#!/bin/bash
set -e

database=${PGDATABASE:-ciip_portal_dev}
user=${PGUSER:-$(whoami)}
host=${PGHOST:-localhost}
port=${PGPORT:-5432}

# =============================================================================
# Usage:
# -----------------------------------------------------------------------------
usage() {
    cat << EOF
$0 [-d] [-p] [-s] [-t] [-prod] [--swrs-dev] [--swrs-load-testing] [--app-count <n>] [-h]

Upserts test data in the $database database, and deploys the schemas using sqitch if needed.
If run without the corresponding options, this script will deploy the swrs and portal schemas
if they do not exist, and then insert the portal test data.

Options

  -d, --drop-db
    Drops the $database database before deploying
  -prod, --prod-data
    Deploy production data only
  -dev, --dev-data
    Deploy development data. Includes prod data
  --swrs-dev
    Deploy the swrs dev data
  --swrs-load-testing
    Deploy the swrs load-testing data. This requires the .cas-ggircs submodule to be initialized
  --ciip-load-testing
    Deploys ciip load-testing data
  -t, --pg-tap
    Deploy test data for pgTap database test suite
  -s, --deploy-swrs-schema
    Redeploys the swrs schema and inserts the swrs test reports. This requires the .cas-ggircs submodule to be initialized
  -p, --deploy-portal-schema
    Redeploys the portal schema
  --app-count <n>
    Creates n applications for each operator in the dev data that reference an application status
    Affected operator types: (Draft operator, Submitted operator, Changes requested operator)
    n must be an integer from 1-100
  -h, --help
    Prints this message

EOF
}

if [ "$#" -gt 5 ]; then
    echo "Passed $# parameters. Expected 0 to 5."
    usage
    exit 1
fi

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname" > /dev/null

_psql() {
  psql -d "$database" -h "$host" -p "$port" -U "$user" -qtA --set ON_ERROR_STOP=1 "$@" 2>&1
}

_sqitch() {
  SQITCH_TARGET="db:pg:" PGHOST="$host" PGDATABASE="$database" sqitch "$@"
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
    _sqitch revert -y || return 0;
  fi
  return 0;
}

deployMocks() {
  echo "Deploying the mocks schema to $database"
  if [ ! -f ../../mocks_schema/sqitch.plan ]; then
    echo "Could not find sqitch plan in mocks_schema/"
    exit 1
  fi
  pushd ../../mocks_schema
  sqitch_revert
  _sqitch deploy
  popd
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
  _sqitch deploy
  popd
    _psql <<EOF
  insert into
    swrs_extract.eccc_xml_file (id, xml_file)
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

revertPortal() {
  echo "Reverting the portal schema in $database"
  pushd ..
  sqitch_revert
  popd
}

deployPortal() {
  deploySwrsIfNotExists
  echo "Deploying the portal schema to $database"
  pushd ..
  _sqitch deploy
  popd
}

refreshSwrsVersions() {
  echo "Refresh all outdated application swrs versions (version 0)"
  _psql -c "select ggircs_portal_private.refresh_swrs_version_data()"
  return 0
}

apps_to_create=0


while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -d | --drop-db )
    actions+=('dropdb' 'deploySwrs' 'deployPortal')
    ;;
  -prod | --prod-data | --oc-project=*-prod)
    actions+=('deployProd')
    ;;
  --oc-project=*-test)
    # in the test (QA) openshift environment, we need to deploy the prod data, including organisations/facilities
    actions+=('deployMocks' 'deployProd')
    ;;
  -test | --test-data)
    # test data includes all prod data except organisations/facilities
    actions+=('deployMocks' 'deployTest')
    ;;
  -dev | --dev-data | --oc-project=*-dev )
    actions+=('deployMocks' 'deployDev')
    ;;
  -mocks | --deploy-mocks-schema )
    actions+=('deployMocks')
    ;;
  -p | --deploy-portal-schema )
    actions+=('deployPortal')
    ;;
  -s | --deploy-swrs-schema )
    actions+=('deploySwrs')
    ;;
  -r | --refresh-swrs-versions )
    actions+=('refreshSwrsVersions')
    ;;
  --swrs-dev )
    actions+=('deploySwrsDevData')
    ;;
  --swrs-load-testing )
    actions+=('deploySwrsLoadTestingData')
    ;;
  --ciip-load-testing )
    actions+=('deployCiipLoadTestingData')
    ;;
  -t | --pg-tap )
    actions+=('deployMocks' 'deployPgTapData')
    ;;
  --app-count )
    apps_to_create=$2
    ;;
  -h | --help )
    usage
    exit 0
    ;;
esac; shift; done

deployProdData() {
  _psql -c "select ggircs_portal_private.add_enum_comparison_operators('ggircs_portal');"
  _psql -f "./prod/form_json.sql"
  _psql -f "./prod/ciip_application_wizard.sql"
  _psql -f "./prod/fuel.sql"
  _psql -f "./prod/energy_product.sql"
  _psql -f "./prod/organisation_and_facility.sql"
  _psql -f "./prod/emission.sql"
  _psql -f "./prod/gas.sql"
  _psql -f "./prod/emission_gas.sql"
  _psql -f "./prod/review_step.sql"
  _psql -f "./prod/application_validation_function.sql"
  _psql -f "./prod/fuel_emission_category.sql"
  return 0;
}

deployTestData() {
  _psql -f "./prod/form_json.sql"
  _psql -f "./prod/ciip_application_wizard.sql"
  _psql -f "./prod/fuel.sql"
  _psql -f "./prod/energy_product.sql"
  _psql -f "./prod/emission.sql"
  _psql -f "./prod/gas.sql"
  _psql -f "./prod/emission_gas.sql"
  _psql -f "./prod/review_step.sql"
  _psql -f "./prod/application_validation_function.sql"
  _psql -f "./prod/fuel_emission_category.sql"
  return 0;
}

deployDevData() {
  deployProdData
  _psql -f "./dev/reporting_year.sql"
  _psql -f "./dev/product.sql"
  _psql -f "./dev/benchmark.sql"
  _psql -f "./dev/user.sql"
  _psql -f "./dev/linked_product.sql"
  _psql -f "./dev/product_naics_code.sql"
  _psql -f "./dev/ciip_user_organisation.sql"
  _psql -f "./dev/override_last_swrs_reporting_year.sql"
  return 0;
}

deployCiipLoadTestingData() {
  deployProdData
  _psql -f "./dev/reporting_year.sql"
  _psql -f "./dev/product.sql"
  _psql -f "./dev/benchmark.sql"
  _psql -f "./dev/user.sql"
  _psql -f "./dev/ciip_user_organisation_load_testing.sql"
  _psql -f "./dev/linked_product.sql"
  _psql -f "./dev/product_naics_code.sql"
  _psql -f "./dev/override_last_swrs_reporting_year.sql"
  return 0;
}

deploySwrsDevData() {
  PGDATABASE="$database" ../.cas-ggircs/test/data/dev/deploy_data.sh --dev
  return 0;
}

deploySwrsLoadTestingData() {
  PGDATABASE="$database" ../.cas-ggircs/test/data/dev/deploy_data.sh --load-test
  return 0;
}

deployPgTapData() {
  deployProdData
  _psql -f "./dev/reporting_year.sql"
  _psql -f "./dev/product.sql"
  _psql -f "./dev/benchmark.sql"
  _psql -f "./dev/user.sql"
  _psql -f "./dev/linked_product.sql"
  _psql -f "./dev/product_naics_code.sql"
  _psql -f "./pgTapData/facility.sql"
  _psql -f "./pgTapData/ciip_user_organisation.sql"
  _psql -f "./pgTapData/application.sql"
  _psql -f "./pgTapData/form_result.sql"
  _psql -f "./pgTapData/application-2018.sql"
  _psql -f "./pgTapData/application_submission.sql"
  return 0;
}

if [[ " ${actions[*]} " =~ " dropdb " ]]; then
  dropdb
fi

createdb

if [[ " ${actions[*]} " =~ " deploySwrs " ]]; then
  deploySwrs
fi
if [[ " ${actions[*]} " =~ " deployPortal " ]]; then
  revertPortal
fi

deployPortal

if [[ " ${actions[*]} " =~ " deployMocks " ]]; then
  echo "Deploying mocks schema"
  deployMocks
fi

if [[ " ${actions[*]} " =~ " deployProd " ]]; then
  echo 'Deploying production data'
  deployProdData
fi
if [[ " ${actions[*]} " =~ " deployTest " ]]; then
  echo 'Deploying test production data'
  deployTestData
fi

if [[ " ${actions[*]} " =~ " deploySwrsDevData " ]]; then
  echo 'Deploying swrs development data'
  deploySwrsDevData
fi

if [[ " ${actions[*]} " =~ " deploySwrsLoadTestingData " ]]; then
  echo 'Deploying swrs load-testing data'
  deploySwrsLoadTestingData
fi

if [[ " ${actions[*]} " =~ " deployCiipLoadTestingData " ]]; then
  echo 'Deploying ciip load-testing data'
  deployCiipLoadTestingData
fi

if [[ " ${actions[*]} " =~ " deployDev " ]]; then
  echo 'Deploying development data'
  deployDevData
fi

if [[ " ${actions[*]} " =~ " deployPgTapData " ]]; then
  echo 'Deploying pgTap test data'
  deployPgTapData
fi

if [[ $apps_to_create -gt 0 && $apps_to_create -lt 101 ]]; then
  _psql -f "./dev/create_dev_applications.sql" -v num_apps="$apps_to_create"
fi

if [[ $apps_to_create -gt 100 ]]; then
  echo "WARNING: ** --app-count was passed a value that is greater then the number of facilities (100) in each reporting year. Creating the maximum (100) instead of the passed value: $apps_to_create. **"
  _psql -f "./dev/create_dev_applications.sql" -v num_apps=100
fi

if [[ " ${actions[*]} " =~ " refreshSwrsVersions " ]]; then
  refreshSwrsVersions
fi
