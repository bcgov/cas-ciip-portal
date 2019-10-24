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
  swrs_extract.ghgr_import (xml_file)
values
 ('$(sed -e "s/'/''/g" < ./data/swrs/swrs_report_11033X.xml)');
EOF

psql -d $dev_db -c "select swrs_transform.load()"

sqitch deploy
