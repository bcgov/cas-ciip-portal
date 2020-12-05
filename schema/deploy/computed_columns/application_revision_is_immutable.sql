-- Deploy ggircs-portal:computed_columns/application_revision_is_immutable to pg
-- requires: computed_columns/application_application_revision_status

begin;

create or replace function ggircs_portal.application_revision_is_immutable(application_revision ggircs_portal.application_revision)
    returns boolean
as
$function$
declare
  app_status text;
begin

  with record as (
    select row(application.*)::ggircs_portal.application
    from ggircs_portal.application where id = application_revision.application_id
  )
  select application_revision_status::text into app_status from ggircs_portal.application_application_revision_status((select * from record), application_revision.version_number::text);

  if (app_status = 'draft') then
    return false;
  end if;

  return true;

end;
$function$ language 'plpgsql' stable;

grant execute on function ggircs_portal.application_revision_is_immutable to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_application_revision_status is 'Computed column to determine whether a revision is immutable (submitted)';

commit;
