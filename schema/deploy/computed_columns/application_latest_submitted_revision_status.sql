-- Deploy ggircs-portal:computed_columns/application_latest_submitted_revision_status to pg

begin;

create or replace function ggircs_portal.application_latest_submitted_revision_status(app ggircs_portal.application)
  returns ggircs_portal.ciip_application_revision_status
  as $$
    select application_revision_status
    from ggircs_portal.application_revision_status
    where application_id = app.id
      and version_number = (ggircs_portal.application_latest_submitted_revision(app::ggircs_portal.application)).version_number
    order by id desc
    limit 1;
  $$ language sql stable;

comment on function ggircs_portal.application_latest_submitted_revision_status(ggircs_portal.application) is E'@sortable\nReturns the current status of an application, excluding application revisions that are not submitted yet (i.e. in draft)';

commit;
