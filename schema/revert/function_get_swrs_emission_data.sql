-- Revert ggircs-portal:function_get_swrs_emission_data from pg


begin;

drop function ggircs_portal.get_swrs_emission_data;
drop type ggircs_portal.emission_data;

COMMIT;
