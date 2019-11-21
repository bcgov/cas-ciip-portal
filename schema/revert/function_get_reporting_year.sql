-- Revert ggircs-portal:function_get_reporting_year from pg


begin;

drop function ggircs_portal.get_reporting_year;

commit;
