-- Deploy ggircs-portal:computed_columns/application_revision_is_current_version to pg
-- requires: tables/application_revision

begin;

create or replace function ggircs_portal.application_revision_is_current_version(application_revision ggircs_portal.application_revision)
    returns boolean
as
$function$
declare
begin
    return application_revision.version_number = (select max(version_number) from ggircs_portal.application_revision ar where application_revision.application_id = ar.application_id);
end;
$function$
    language 'plpgsql' stable;

grant execute on function ggircs_portal.application_revision_is_current_version to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_is_current_version is 'Computed column indicates if a revision is the current version of the application';

commit;
