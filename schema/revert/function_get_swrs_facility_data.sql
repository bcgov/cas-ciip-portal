-- Revert ggircs-portal:function_import_from_swrs from pg

BEGIN;

drop function ggircs_portal.get_swrs_facility_data;
drop type ggircs_portal.facility_data;

commit;
