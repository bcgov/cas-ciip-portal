#!/bin/bash
set -e

dev_db=ggircs_dev

echo "Drop the $dev_db database if it exists"
psql -tc "SELECT 1 FROM pg_database WHERE datname = '$dev_db'" | grep -q 1 && psql -c "DROP DATABASE $dev_db";
echo "Create the $dev_db database"
psql -c "CREATE DATABASE $dev_db";

pushd .cas-ggircs
sqitch deploy
popd
psql $dev_db <<EOF
insert into
  swrs_extract.ghgr_import (id, xml_file)
values
 (1,'$(sed -e "s/'/''/g" < ./data/swrs/swrs_report_11033X.xml)');
EOF

psql -d $dev_db -c "select swrs_transform.load()"

sqitch deploy

psql $dev_db <<EOF
begin;
insert into ggircs_portal.form_json
  (id, name, form_json)
values
  (1, 'Admin', '$(cat ./data/portal/form_json/administration.json)'::jsonb),
  (2, 'Emission', '$(cat ./data/portal/form_json/emission.json)'::jsonb),
  (3, 'Fuel', '$(cat ./data/portal/form_json/fuel.json)'::jsonb),
  (4, 'Electricity and Heat', '$(cat ./data/portal/form_json/electricity_and_heat.json)'::jsonb),
  (5, 'Production', '$(cat ./data/portal/form_json/production.json)'::jsonb),
  (6, 'Statement of Certification', '$(cat ./data/portal/form_json/statement_of_certification.json)'::jsonb)
  on conflict(id) do update
  set name=excluded.name, form_json=excluded.form_json;

insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position, prepopulate_from_ciip, prepopulate_from_swrs)
values
  (1, 0, true, true),
  (2, 1, false, true),
  (3, 2, false, true),
  (4, 3, false, false),
  (5, 4, false, false),
  (6, 5, false, false)
  on conflict(form_id) do update
  set
    form_position=excluded.form_position,
    prepopulate_from_ciip=excluded.prepopulate_from_ciip,
    prepopulate_from_swrs=excluded.prepopulate_from_swrs
  ;
  commit;
EOF
