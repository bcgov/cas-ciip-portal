-- Deploy ggircs-portal:tables/application_revision_status_002 to pg
-- requires: trigger_functions/create_or_refresh_review_step

begin;

create trigger _create_or_refresh_review_step
    before insert on ggircs_portal.application_revision_status
    for each row
    execute procedure ggircs_portal_private.create_or_refresh_review_step();

commit;
