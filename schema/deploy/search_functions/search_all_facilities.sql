-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: type_facility_search_result
-- requires: view_ciip_application

begin;

create or replace function ggircs_portal.search_all_facilities(search_field text, search_value text, order_by_field text, direction text, organisation_row_id text, offset_value int)

  returns setof ggircs_portal.facility_search_result as
    $function$
      declare
        user_sub uuid;
        user_id int;
        facilities_query text;
        search_query_input_query text;
      begin
        user_sub := (select sub from ggircs_portal.session());
        user_id := (select id from ggircs_portal.ciip_user as cu where cu.uuid = user_sub);

        -- Filters the facilities by organisation if the organisation_row_id variable is set
        if organisation_row_id is null then
          facilities_query := '(select * from ggircs_portal.facility)';
        else
          facilities_query := '(select * from ggircs_portal.facility where facility.organisation_id = ' || organisation_row_id || ')';
        end if;

        search_query_input_query := 'with applicationStatus as (
          select t.application_revision_status as application_revision_status, t.version_number, t.created_at, t.application_id
          from ggircs_portal.application_revision_status t
          join (select application_id, max(version_number) as latest_version, max(created_at) as last_created
          from ggircs_portal.application_revision_status
          group by application_id) a
          on a.application_id = t.application_id
          and a.latest_version = t.version_number
          and a.last_created = t.created_at),

          applicationDetails as (
              select s.application_revision_status, a.id, a.facility_id
              from ggircs_portal.application a
              join applicationStatus s
              on a.id = s.application_id
          ),

          tempTable as (select f.*, ad.application_revision_status, ad.id as application_id, r.reporting_period_duration
          from ' || facilities_query || ' f
          left join applicationDetails ad on f.id = ad.facility_id
          left join swrs.report r on f.report_id = r.id),

          organisationInfo as (
              select row_number() over()::int as id,
              t.application_id::int,
              t.id::int as facility_id,
              t.facility_name,
              t.facility_type,
              t.bcghgid,
              t.reporting_period_duration as last_swrs_reporting_year,
              t.application_revision_status,
              o.operator_name as organisation_name
              from tempTable t
              join ggircs_portal.organisation o
              on t.organisation_id = o.id::int
              join ggircs_portal.ciip_user_organisation uo
              on uo.organisation_id = o.id
              and uo.user_id = ' || user_id || '),

          total_count as (
            select count(*)::integer as total_facility_count from organisationInfo
          )';

        if search_field is null or search_value is null
          then return query execute search_query_input_query ||
          'select organisationInfo.*, total_facility_count from organisationInfo, total_count order by ' || order_by_field || ' ' || direction || ' limit 10 offset ' || offset_value;
        else
          return query execute search_query_input_query ||
            'select organisationInfo.*, total_facility_count from organisationInfo, total_count
            where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction || ' limit 10 offset ' || offset_value;
        end if;
      end
    $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_all_facilities to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
