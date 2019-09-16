-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

BEGIN;

create or replace function ggircs_portal.search_application_list(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.ciip_application as
        $function$
            begin
                    if search_field is null or search_value is null
                        then return query EXECUTE 'select * from ggircs_portal.ciip_application order by ' || order_by_field || ' ' || direction;
                    else
                        return query EXECUTE 'select * from ggircs_portal.ciip_application where '|| search_field || '::text ILIKE ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction;
                end if;
            end
        $function$ language plpgsql stable;

COMMIT;
