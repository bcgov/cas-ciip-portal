-- Revert ggircs-portal:function_import_swrs_organisation_facility from pg

begin;

drop function ggircs_portal.import_swrs_organisation_facility;

commit;
