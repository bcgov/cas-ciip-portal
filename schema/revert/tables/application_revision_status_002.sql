-- Revert ggircs-portal:tables/application_revision_status_002 from pg

begin;

drop trigger _create_or_refresh_review_step on ggircs_portal.application_revision_status;

commit;
