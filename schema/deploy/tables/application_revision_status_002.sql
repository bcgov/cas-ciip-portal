-- Deploy ggircs-portal:tables/application_revision_status_002 to pg
-- requires: trigger_functions/create_or_refresh_review_step

begin;

create trigger _create_or_refresh_review_step
    before insert on ggircs_portal.application_revision_status
    for each row
    when (new.application_revision_status = 'submitted'::ggircs_portal.ciip_application_revision_status)
    execute procedure ggircs_portal_private.create_or_refresh_review_step();

commit;
