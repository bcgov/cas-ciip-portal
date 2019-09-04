-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

BEGIN;

create or replace function ggircs_portal.search_application_list(field text, search text)

    returns setof ggircs_portal.application as
        $function$
            begin
                return query EXECUTE 'select * from ggircs_portal.application where '|| field || '::text ILIKE ''%' || search || '%'' ';
            end
        $function$ language plpgsql stable;

COMMIT;
