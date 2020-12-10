-- Revert ggircs-portal:opened_reporting_year from pg

begin;

drop function ggircs_portal.opened_reporting_year;

commit;
