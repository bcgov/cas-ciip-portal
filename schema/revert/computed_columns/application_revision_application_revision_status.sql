-- Deploy ggircs-portal:function_application_revision_application_revision_status to pg
-- requires: table_application_revision_status

begin;

create or replace function ggircs_portal.application_revision_application_revision_status(application_revision ggircs_portal.application_revision)
    returns ggircs_portal.application_revision_status
as
$function$
declare
begin
    return (
        select row(_application_revision_status.*)
        from ggircs_portal.application_revision_status as _application_revision_status
        where _application_revision_status.application_id = application_revision.application_id
        and _application_revision_status.version_number = application_revision.version_number
        order by _application_revision_status.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;

grant execute on function ggircs_portal.application_revision_application_revision_status to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_application_revision_status is 'Computed column for graphql to traverse to the latest application_revision_status from application_revision';

commit;
