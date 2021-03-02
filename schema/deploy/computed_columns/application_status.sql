-- Deploy ggircs-portal:computed_columns/application_status to pg
-- requires: computed_columns/application_application_revision_status

begin;

create or replace function ggircs_portal.application_status(app ggircs_portal.application)
  returns ggircs_portal.ciip_application_revision_status
  as $$
    select (ggircs_portal.application_application_revision_status(app::ggircs_portal.application, null)).application_revision_status;
  $$ language sql stable;

comment on function ggircs_portal.application_status(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return application_revision_status as a scalar from the composite return of the application_application_revision_status computed column';

commit;
