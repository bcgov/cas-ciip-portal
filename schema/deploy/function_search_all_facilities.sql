-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: type_facility_search_result
-- requires: view_ciip_application

begin;

create or replace function ggircs_portal.search_all_facilities(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.facility_search_result as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with applicationStatus as (
                        select t.application_status as application_status, t.created_at, t.application_id as id
                        from ggircs_portal.application_status t
                        join (select application_id, max(created_at) as max_date
                        from ggircs_portal.application_status
                        group by application_id)a on a.application_id = t.application_id and a.max_date = t.created_at),

                        applicationDetails as (
                            select s.application_status as application_status, a.id as id, a.facility_id as facility_id
                            from ggircs_portal.application as a join applicationStatus as s on a.id = s.id
                        ),

                        tempTable as (select f.*, ad.application_status as application_status, ad.id as application_id
                        from ggircs_portal.facility as f
                        left join applicationDetails as ad on f.id = ad.facility_id ),

                        organisationInfo as (
                            select row_number() over()::int as id, t.application_id::int, t.id::int as facility_id, t.facility_name, t.facility_mailing_address, t.facility_city, t.facility_postal_code, t.reporting_year, t.application_status, o.operator_name as organisation_name
                            from tempTable as t join ggircs_portal.organisation as o on t.organisation_id = o.id::int
                            order by ' || order_by_field || ' ' || direction || ' )
                        select * from organisationInfo';
                        -- where reporting_year::int =
                        -- (date_part(''year'', CURRENT_DATE))';
                else
                    return query execute 'with applicationStatus as (
                        select t.application_status as application_status, t.created_at, t.application_id as id
                        from ggircs_portal.application_status t
                        join (select application_id, max(created_at) as max_date
                        from ggircs_portal.application_status
                        group by application_id)a on a.application_id = t.application_id and a.max_date = t.created_at),

                        applicationDetails as (
                            select s.application_status as application_status, a.id as id, a.facility_id as facility_id
                            from ggircs_portal.application as a join applicationStatus as s on a.id = s.id
                        ),

                        tempTable as (select f.*, ad.application_status as application_status, ad.id as application_id
                        from ggircs_portal.facility as f
                        left join applicationDetails as ad on f.id = ad.facility_id ),

                        organisationInfo as (
                            select row_number() over()::int as id, t.application_id::int, t.id::int as facility_id, t.facility_name, t.facility_mailing_address, t.facility_city, t.facility_postal_code, t.reporting_year, t.application_status, o.operator_name as organisation_name
                            from tempTable as t join ggircs_portal.organisation as o on t.organisation_id = o.id::int)
                        select * from organisationInfo
                        where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction;
                        -- where reporting_year::int =
                        -- (date_part(''year'', CURRENT_DATE))';
                end if;
            end
        $function$ language plpgsql stable;

commit;
