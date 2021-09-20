-- Revert ggircs-portal:tables/application_revision_status_003 from pg

begin;

drop trigger _restrict_old_application_submission on ggircs_portal.application_revision_status;

commit;
