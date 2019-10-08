-- Revert ggircs-portal:function_get_swrs_emission_data from pg


BEGIN;

drop function ggircs_portal.get_swrs_emission_data;
drop type ggircs_portal.emission_data;

COMMIT;
