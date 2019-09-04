-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

BEGIN;

create or replace function ggircs_portal.search_application_list(field text, search text)

    returns setof ggircs_portal.application as
        $function$
            begin
                    if field is null then return query EXECUTE 'select * from ggircs_portal.application order by operator_name';
                    else return query EXECUTE 'select * from ggircs_portal.application where '|| field || '::text ILIKE ''%' || search || '%'' order by operator_name';
                end if;
            end
        $function$ language plpgsql stable;

COMMIT;
