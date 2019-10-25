#!/bin/bash
set -e

dev_db=ggircs_dev
__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

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

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -d | --drop-db )
    ;;
  -p | --deploy-portal-schema )

    ;;
  -s | --deploy-swrs-schema )
    ;;
esac; shift; done

psql -d $dev_db <<EOF
begin;
insert into ggircs_portal.form_json
  (id, name, form_json)
values
  (1, 'Admin', '$(cat "$__dirname/data/portal/form_json/administration.json")'::jsonb),
  (2, 'Emission', '$(cat "$__dirname/data/portal/form_json/emission.json")'::jsonb),
  (3, 'Fuel', '$(cat "$__dirname/data/portal/form_json/fuel.json")'::jsonb),
  (4, 'Electricity and Heat', '$(cat "$__dirname/data/portal/form_json/electricity_and_heat.json")'::jsonb),
  (5, 'Production', '$(cat "$__dirname/data/portal/form_json/production.json")'::jsonb),
  (6, 'Statement of Certification', '$(cat "$__dirname/data/portal/form_json/statement_of_certification.json")'::jsonb)
  on conflict(id) do update
  set name=excluded.name, form_json=excluded.form_json;





    insert into ggircs_portal.facility (
      id,
      organisation_id,
      report_id,
      swrs_report_id,
      swrs_facility_id ,
      swrs_organisation_id,
      reporting_year,
      facility_name,
      facility_type ,
      bcghgid,
      naics_code,
      naics_classification,
      latitude,
      longitude,
      facility_mailing_address,
      facility_city,
      facility_province,
      facility_postal_code,
      facility_country
    ) values (
      1,
      1,
      1192,
      15736,
      1766,
      1039,
      '2018',
      'Stoddart Comp Stn 14-34',
      'IF_b',
      '12111130338',
      211110,
      'Oil and gas extraction (except oil sands)',
      '56.41986',
      '-121.07136',
      '2500, 855 42nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    ), (
      2,
      1,
      4000,
      15736,
      1767,
      1039,
      '2018',
      'Stoddart Subsidiary',
      'IF_b',
      '12111130339',
      211110,
      'Oil and gas extraction (except oil sands)',
      '56.41986',
      '-121.07136',
      '2500, 855 42nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    ), (
      3,
      2,
      2218,
      16289,
      2251,
      6465,
      '2018',
      'Aggregated Harvest Facilities',
      'IF_b',
      '12111130397',
      211113,
      'Conventional Oil and Gas Extraction',
      '56.41986',
      '-121.07136',
      '2100, 330 5 Avenue',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );



    insert into ggircs_portal.organisation (
      id,
      report_id,
      swrs_report_id,
      swrs_organisation_id,
      reporting_year,
      operator_name,
      operator_trade_name,
      duns,
      cra_business_number,
      operator_mailing_address,
      operator_city,
      operator_province,
      operator_postal_code,
      operator_country
    ) values (
      1,
      1192,
      15736,
      1039,
      '2018',
      'Canadian Natural Resources Limited',
      'Canadian Natural Resources Limited',
      '209137967',
      '121346357',
      'unit  2500, 855  2nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );

    insert into ggircs_portal.organisation (
      id,
      report_id,
      swrs_report_id,
      swrs_organisation_id,
      reporting_year,
      operator_name,
      operator_trade_name,
      duns,
      cra_business_number,
      operator_mailing_address,
      operator_city,
      operator_province,
      operator_postal_code,
      operator_country
    ) values (
      2,
      2218,
      16289,
      6465,
      '2018',
      'HARVEST OPERATIONS CORP.',
      'HARVEST OPERATIONS CORP.',
      '999999999',
      '863096665',
      '1500, 700 2 Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );

insert into ggircs_portal.user (id, uuid, first_name, last_name, email_address)
        values (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Hamza', 'Javed', 'hamza@button.is');
insert into ggircs_portal.user (id, uuid, first_name, last_name, email_address)
        values (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Alec', 'Wenzowski', 'alec@button.is');
insert into ggircs_portal.user (id, uuid, first_name, last_name, email_address)
        values (3, '11bc5fb8-88f6-4b6e-92e3-581622ad4804', 'Kawhi', 'Leonard', 'kawhi@button.is');


commit;
EOF

psql -d $dev_db -f "$__dirname/data/portal/ciip_application_wizard.sql"
psql -d $dev_db -f "$__dirname/data/portal/fuel.sql"
