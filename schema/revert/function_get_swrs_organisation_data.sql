-- Revert ggircs-portal:function_import_from_swrs from pg

begin;

drop function ggircs_portal.get_swrs_organisation_data;
drop type ggircs_portal.organisation_data;

commit;
