-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

begin;

create or replace function ggircs_portal.search_application_list(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.application as
        $function$
            begin
                    if search_field is null or search_value is null
                        then return query execute 'select * from ggircs_portal.application order by ' || order_by_field || ' ' || direction;
                    else
                        return query execute 'select * from ggircs_portal.application where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction;
                end if;
            end
        $function$ language plpgsql stable;

commit;
