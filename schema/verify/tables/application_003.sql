-- Verify ggircs-portal:tables/application_003 on pg

begin;

select column_name
from information_schema.columns
where table_schema='ggircs_portal' and table_name='application' and column_name='swrs_report_id';

rollback;
