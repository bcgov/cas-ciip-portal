-- Revert ggircs-portal:computed_columns/application_application_revision_status_wrapper_status from pg

begin;

drop function ggircs_portal.application_application_revision_status_wrapper_status;

commit;
