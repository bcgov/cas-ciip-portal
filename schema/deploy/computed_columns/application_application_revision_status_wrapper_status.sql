-- Deploy ggircs-portal:computed_columns/application_application_revision_status_wrapper_status to pg
-- requires: computed_columns/application_application_revision_status

begin;

-- wrapper. Note the () for notation. Failing to use them will throw an error
create or replace function ggircs_portal.application_application_revision_status_wrapper_status(app ggircs_portal.application)
  returns varchar
  as $$
    select (ggircs_portal.application_application_revision_status(app::ggircs_portal.application, null)).application_revision_status::varchar;
  $$ language sql stable;

-- don't forget the comments...
comment on function ggircs_portal.application_application_revision_status_wrapper_status(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return application_revision_status as a scalar';

COMMIT;
