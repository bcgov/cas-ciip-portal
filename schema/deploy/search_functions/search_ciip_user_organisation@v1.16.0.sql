-- Deploy ggircs-portal:function_search_ciip_user_organisation to pg
-- requires: table_user_organisation

begin;

create or replace function ggircs_portal.search_ciip_user_organisation(search_field text, search_value text, order_by_field text, direction text)

returns setof ggircs_portal.ciip_user_organisation as
        $function$
            begin
                    if search_field is null or search_value is null
                        then return query execute 'with tempTable as (select uo.id, uo.user_id, uo.organisation_id, uo.status from ggircs_portal.ciip_user_organisation as uo join ggircs_portal.organisation as o on uo.organisation_id = o.id
                        join ggircs_portal.ciip_user as u on uo.user_id = u.id
                        order by ' || order_by_field || ' ' || direction || ' ) select * from tempTable';
                    else
                        return query execute 'with tempTable as (select uo.id, uo.user_id, uo.organisation_id, uo.status from ggircs_portal.ciip_user_organisation as uo join ggircs_portal.organisation as o on uo.organisation_id = o.id
                        join ggircs_portal.ciip_user as u on uo.user_id = u.id
                        where '|| search_field || '::text ilike ''%' || search_value || '%'' order by '|| order_by_field || ' ' || direction || ' ) select * from tempTable';
                end if;
            end
        $function$ language plpgsql stable;

  grant execute on function ggircs_portal.search_ciip_user_organisation to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
