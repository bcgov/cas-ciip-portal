-- Deploy ggircs-portal:computed_columns/application_submission_date to pg
-- requires: computed_columns/application_application_revision_status

begin;

create or replace function ggircs_portal.application_submission_date(app ggircs_portal.application)
  returns timestamptz
  as $$
    select (ggircs_portal.application_application_revision_status(app::ggircs_portal.application, null)).created_at;
  $$ language sql stable;

comment on function ggircs_portal.application_submission_date(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return created_at (as submission_date) as a scalar from the composite return of the application_application_revision_status computed column';

commit;
