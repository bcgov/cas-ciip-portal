-- Deploy ggircs-portal:function_search_organisation_facilities to pg
-- requires: table_facility

begin;

create or replace function ggircs_portal.search_organisation_facilities(search_field text, search_value text, order_by_field text, direction text, organisation_id int)

    returns setof ggircs_portal.facility as
        $function$
            begin
                if search_field is null or search_value is null
                    then return query execute 'with tempTable as (select * from ggircs_portal.application as a join ggircs_portal.facility as f on a.facility_id = f.id
                    and f.organisation_id = organisation.id
                    order by ' || order_by_field || ' ' || direction ' ) select f.name, f.mailing_address, a.application_status from tempTable';
                else
                    return query execute 'with tempTable as (select * from ggircs_portal.application as a join ggircs_portal.facility as f on a.facility_id = f.id
                    and f.organisation_id = organisation.id
                    where '|| search_field || '::text ilike ''%' || search_value || '%'' order by' || order_by_field || ' ' || direction || ') select f.name, f.mailing_address, a.application_status from tempTable';

            end if;
            end
        $function$ language plpgsql stable;

commit;
