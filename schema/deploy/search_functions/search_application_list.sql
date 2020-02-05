-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

begin;

create or replace function ggircs_portal.search_application_list(search_field text, search_value text, order_by_field text, direction text)

    returns setof ggircs_portal.application_search_result as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with x as (select row_number() over () as id, a.id as application_id, o.operator_name, f.facility_name, a.reporting_year, f.bcghgid, status.id as status_id, status.created_at as submission_date, status.application_revision_status
                                              from ggircs_portal.application a
                                              join ggircs_portal.application_revision ar on a.id = ar.application_id
                                              join ggircs_portal.application_revision_status status on ar.application_id = status.application_id
                                                and ar.version_number = status.version_number
                                                and status.application_revision_status != ''draft''
                                                and status.version_number != 0
                                              join ggircs_portal.facility f on a.facility_id = f.id
                                              join ggircs_portal.organisation o on f.organisation_id = o.id),
                                              y as (select max(status_id) as max_id from x group by application_id)
                                              select id,
                                                    application_id,
                                                    operator_name,
                                                    facility_name,
                                                    reporting_year,
                                                    bcghgid,
                                                    submission_date,
                                                    application_revision_status
                                                    from x inner join y on x.status_id = y.max_id
                                                    order by ' || order_by_field || ' ' || direction;
                else
                    return query execute 'with x as (select row_number() over () as id, a.id as application_id, o.operator_name, f.facility_name, a.reporting_year, f.bcghgid, status.id as status_id, status.created_at as submission_date, status.application_revision_status
                                              from ggircs_portal.application a
                                              join ggircs_portal.application_revision ar on a.id = ar.application_id
                                              join ggircs_portal.application_revision_status status on ar.application_id = status.application_id
                                                and ar.version_number = status.version_number
                                                and status.application_revision_status != ''draft''
                                                and status.version_number != 0
                                              join ggircs_portal.facility f on a.facility_id = f.id
                                              join ggircs_portal.organisation o on f.organisation_id = o.id),
                                              y as (select max(status_id) as max_id from x group by application_id)
                                              select id,
                                                    application_id,
                                                    operator_name,
                                                    facility_name,
                                                    reporting_year,
                                                    bcghgid,
                                                    submission_date,
                                                    application_revision_status
                                                    from x inner join y on x.status_id = y.max_id
                                                    and '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction;
                end if;
            end
        $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_application_list to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
