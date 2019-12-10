-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: table_facility
-- requires: view_ciip_application

begin;

create or replace function ggircs_portal.search_all_facilities(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.facility as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with tempTable as (select f.*
                    from ggircs_portal.facility as f left outer join ggircs_portal.application as a on f.id::int = a.facility_id
                    join ggircs_portal.ciip_application as c on a.id = c.id
                    order by ' || order_by_field || ' ' || direction || ' )
                    select * from tempTable ';
                    -- where reporting_year::int =
                    -- (date_part(''year'', CURRENT_DATE))';
                else
                    return query execute 'with tempTable as (select f.*
                    from ggircs_portal.facility as f left outer join ggircs_portal.application as a on f.id::int = a.facility_id
                    join ggircs_portal.ciip_application as c on a.id = c.id
                    where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction || ')
                    select * from tempTable';
                    -- where reporting_year::int =
                    -- (date_part(''year'', CURRENT_DATE))';
                end if;
            end
        $function$ language plpgsql stable;

commit;
