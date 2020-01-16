-- Revert ggircs-portal:next_reporting_year from pg

begin;

drop function ggircs_portal.next_reporting_year;

commit;
