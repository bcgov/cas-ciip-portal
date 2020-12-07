-- Deploy ggircs-portal:computed_columns/application_application_revision_by_string_version_number to pg

begin;

create or replace function ggircs_portal.application_application_revision_by_string_version_number (
  application ggircs_portal.application, version_number_input text
) returns ggircs_portal.application_revision
as $function$
  declare
    result ggircs_portal.application_revision;
  begin
    select r.* from ggircs_portal.application_revision r
      where r.application_id = application.id
      and r.version_number = version_number_input::int
      into result;
    return result;
  end;
$function$ language 'plpgsql' stable;

grant execute on function ggircs_portal.application_application_revision_by_string_version_number to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_latest_draft_revision is 'Computed column for graphql to retrieve a given application_revision when given a version number as String (e.g. from a router query)';

commit;
