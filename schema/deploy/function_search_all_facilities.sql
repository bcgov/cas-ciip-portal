-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: table_facility
-- requires: view_ciip_application

begin;

create or replace function ggircs_portal.search_all_facilities(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.facility as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with applicationDetails as (
                        select t.application_status as application_status, t.created_at, t.application_id as id
                        from ggircs_portal.application_status t
                        join (select application_id, max(created_at) as max_date
                        from ggircs_portal.application_status
                        group by application_id)a on a.application_id = t.application_id and a.max_date = t.created_at),
                        applicationStatus as (
                            select ad.application_status as application_status, a.id as id, a.facility_id as facility_id
                            from ggircs_portal.application as a join applicationDetails as ad on a.id = ad.id
                        ),
                        tempTable as (select f.*
                        from ggircs_portal.facility as f
                        left join applicationStatus as s on f.id::int = s.facility_id
                        order by ' || order_by_field || ' ' || direction || ' )
                        select * from tempTable ';
                        -- where reporting_year::int =
                        -- (date_part(''year'', CURRENT_DATE))';
                else
                    return query execute 'with applicationDetails as (
                        select t.application_status as application_status, t.created_at, t.application_id as id
                        from ggircs_portal.application_status t
                        join (select application_id, max(created_at) as max_date
                        from ggircs_portal.application_status
                        group by application_id)a on a.application_id = t.application_id and a.max_date = t.created_at),
                        applicationStatus as (
                            select ad.application_status as application_status, a.id as id, a.facility_id as facility_id
                            from ggircs_portal.application as a join applicationDetails as ad on a.id = ad.id
                        ),
                        tempTable as (select f.*
                        from ggircs_portal.facility as f
                        left join applicationStatus as s on f.id::int = s.facility_id
                        where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction || ')
                        select * from tempTable';
                        -- where reporting_year::int =
                        -- (date_part(''year'', CURRENT_DATE))';
                end if;
            end
        $function$ language plpgsql stable;

commit;
