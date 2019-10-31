-- Deploy ggircs-portal:function_application_application_status to pg
-- requires: table_application_status
-- requires: table_application

begin;

create or replace function ggircs_portal.application_application_status(application ggircs_portal.application)
    returns ggircs_portal.application_status
as
$function$
declare
begin
    return (
        select row(_application_status.*)
        from ggircs_portal.application_status as _application_status
        where _application_status.application_id = application.id
        order by _application_status.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;
commit;
