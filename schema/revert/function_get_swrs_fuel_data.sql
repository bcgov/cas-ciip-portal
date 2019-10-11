-- Revert ggircs-portal:function_get_swrs_fuel_data from pg

BEGIN;

drop function ggircs_portal.get_swrs_fuel_data;
drop type ggircs_portal.fuel_data;

commit;
