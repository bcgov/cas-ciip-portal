-- Revert ggircs-portal:queries/default_displayed_reporting_year from pg

begin;

drop function ggircs_portal.default_displayed_reporting_year();

commit;
