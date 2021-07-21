-- Revert ggircs-portal:computed_columns/application_latest_submitted_revision_status from pg

begin;

drop function ggircs_portal.application_latest_submitted_revision_status;

commit;
