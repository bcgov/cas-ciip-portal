-- Deploy ggircs-portal:tables/application_revision_status_003 to pg
-- requires: tables/application_revision_status
-- requires: trigger_functions/restrict_old_application_submission

begin;

create trigger _restrict_old_application_submission
    before insert on ggircs_portal.application_revision_status
    for each row
    execute procedure ggircs_portal_private.restrict_old_application_submission();

commit;
