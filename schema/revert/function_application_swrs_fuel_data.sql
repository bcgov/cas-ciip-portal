-- Revert ggircs-portal:function_application_swrs_fuel_data from pg

begin;

drop function ggircs_portal.application_swrs_fuel_data;

commit;
