-- Revert ggircs-portal:computed_columns/application_revision_facility_emission from pg

begin;

drop function ggircs_portal.application_revision_total_ciip_emissions;

commit;
