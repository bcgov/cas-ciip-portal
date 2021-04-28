-- Revert ggircs-portal:computed_columns/application_revision_fuel_form_data from pg

begin;

drop function ggircs_portal.application_revision_fuel_form_data;

commit;
