-- Revert ggircs-portal:computed_columns/application_revision_ordered_form_results from pg

begin;

drop function ggircs_portal.application_revision_ordered_form_results;

commit;
