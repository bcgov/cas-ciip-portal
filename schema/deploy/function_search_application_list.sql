-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

begin;

create or replace function ggircs_portal.search_application_list(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.application_search_result as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with x as (select row_number() over () as id, a.id as application_id, o.operator_name, f.facility_name, a.reporting_year, f.bcghgid, status.created_at as submission_date, status.application_revision_status
                                              from ggircs_portal.application a
                                              join ggircs_portal.application_revision ar on a.id = ar.application_id
                                              join ggircs_portal.application_revision_status status on ar.application_id = status.application_id
                                                and ar.version_number = status.version_number
                                                and status.application_revision_status != ''draft''
                                              join ggircs_portal.facility f on a.facility_id = f.id
                                              join ggircs_portal.organisation o on f.organisation_id = o.id)
                                              select * from x order by ' || order_by_field || ' ' || direction;
                else
                    return query execute 'with x as (select row_number() over () as id, a.id as application_id, o.operator_name, f.facility_name, a.reporting_year, f.bcghgid, status.created_at as submission_date, status.application_revision_status
                                        from ggircs_portal.application a
                                        join ggircs_portal.application_revision ar on a.id = ar.application_id
                                        join ggircs_portal.application_revision_status status on ar.application_id = status.application_id
                                          and ar.version_number = status.version_number
                                          and status.application_revision_status != ''draft''
                                        join ggircs_portal.facility f on a.facility_id = f.id
                                        join ggircs_portal.organisation o on f.organisation_id = o.id)
                                        select * from x where
                                        '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction;
                end if;
            end
        $function$ language plpgsql stable;

commit;
