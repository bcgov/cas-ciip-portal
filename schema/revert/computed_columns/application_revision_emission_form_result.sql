-- Revert ggircs-portal:computed_columns/application_revision_emission_form_result from pg

begin;

drop function ggircs_portal.application_revision_emission_form_result;

commit;
