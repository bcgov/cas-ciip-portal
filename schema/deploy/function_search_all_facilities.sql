-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: table_facility

begin;

create or replace function ggircs_portal.search_all_facilities(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.facility as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with tempTable as (select * from ggircs_portal.facility as f join ggircs_portal.application as a
                    on f.id = a.facility_id
                    order by ' || order_by_field || ' ' || direction ') select f.* from tempTable';
                else
                    return query execute 'with tempTable as (select * from ggircs_portal.facility as f join ggircs_portal.application as a
                    on f.id = a.facility_id
                    where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction || ') select f.* from tempTable';
                end if;
            end
        $function$ language plpgsql stable;

commit;
