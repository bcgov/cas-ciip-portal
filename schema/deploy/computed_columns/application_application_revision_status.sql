-- Deploy ggircs-portal:function_application_application_revision_status to pg
-- requires: table_application_revision_status
-- requires: table_application

begin;

create or replace function ggircs_portal.application_application_revision_status(application ggircs_portal.application)
    returns ggircs_portal.application_revision_status
as
$function$
declare
begin
    return (
        select row(_application_revision_status.*)
        from ggircs_portal.application_revision_status as _application_revision_status
        where _application_revision_status.application_id = application.id
        and _application_revision_status.version_number = (select max(version_number) from ggircs_portal.application_revision as _application_revision
          where _application_revision.application_id = application.id)
        order by _application_revision_status.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;

grant execute on function ggircs_portal.application_application_revision_status to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
