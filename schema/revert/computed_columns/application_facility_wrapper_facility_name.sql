-- Revert ggircs-portal:computed_columns/application_facility_wrapper_facility_name from pg

begin;

drop function ggircs_portal.application_facility_wrapper_facility_name;

commit;
