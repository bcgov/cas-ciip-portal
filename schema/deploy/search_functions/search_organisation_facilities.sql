-- Deploy ggircs-portal:function_search_organisation_facilities to pg
-- requires: table_facility

begin;

create or replace function ggircs_portal.search_organisation_facilities(search_field text, search_value text, order_by_field text, direction text, organisation_row_id text )

    returns setof ggircs_portal.facility as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with tempTable as (select f.* from ggircs_portal.application as a join ggircs_portal.facility as f on a.facility_id = f.id::int
                    and f.organisation_id = '|| organisation_row_id::int ||'
                    order by ' || order_by_field || ' ' || direction || ' )
                    select * from tempTable';
                else
                    return query execute 'with tempTable as (select f.* from ggircs_portal.application as a join ggircs_portal.facility as f on a.facility_id = f.id::int
                    and f.organisation_id = '|| organisation_row_id::int ||'
                    where '|| search_field || '::text ilike ''%' || search_value || '%'' order by' || order_by_field || ' ' || direction || ')
                    select * from tempTable';

            end if;
            end
        $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_organisation_facilities to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
