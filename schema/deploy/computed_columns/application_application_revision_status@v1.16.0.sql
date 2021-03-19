-- Deploy ggircs-portal:function_application_application_revision_status to pg
-- requires: table_application_revision_status
-- requires: table_application

begin;

create or replace function ggircs_portal.application_application_revision_status(application ggircs_portal.application, version_number_input text)
    returns ggircs_portal.application_revision_status
as
$function$
declare
  conditional_version_number int;
begin
    if version_number_input is not null then
      conditional_version_number := version_number_input::int;
    else
      conditional_version_number := (select max(version_number) from ggircs_portal.application_revision as _application_revision
                                where _application_revision.application_id = application.id);
    end if;

    return (
        select row(_application_revision_status.*)
        from ggircs_portal.application_revision_status as _application_revision_status
        where _application_revision_status.application_id = application.id
        and _application_revision_status.version_number = conditional_version_number
        order by _application_revision_status.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;

grant execute on function ggircs_portal.application_application_revision_status to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_application_revision_status is 'Computed column for graphql to traverse to an application_revision_status from application';

commit;
