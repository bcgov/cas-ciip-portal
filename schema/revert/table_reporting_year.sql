-- Revert ggircs-portal:table_reporting_year from pg

begin;

drop table ggircs_portal.reporting_year;

commit;
