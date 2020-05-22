-- Deploy ggircs-portal:function_ciip_user_certification_requests to pg
-- requires: table_ciip_user
-- requires: table_certification_url
-- requires: table_application

begin;

  create or replace function ggircs_portal.ciip_user_certification_requests(
    ciip_user ggircs_portal.ciip_user,
    search_fields text[],
    search_values text[],
    order_by_field text,
    direction text,
    offset_value int
  )
  returns setof ggircs_portal.search_certification_url_result2
  as
  $body$
    declare
      search_string text;
      order_by_string text;
      search_query text;
      search_value_string text;
    begin
      email := 'certifier@certi.fy';
      order_by_string := concat(' order by ', order_by_field, ' ', direction);
      search_query := 'with applicationStatus as (
                        select t.application_revision_status as application_revision_status, t.version_number, t.created_at, t.application_id
                        from ggircs_portal.application_revision_status t
                        join (select application_id, max(version_number) as latest_version, max(created_at) as last_created
                        from ggircs_portal.application_revision_status
                        group by application_id) a
                        on a.application_id = t.application_id
                        and a.latest_version = t.version_number
                        and a.last_created = t.created_at)
                        select
                        c.id,
                        c.application_id,
                        c.version_number ,
                        c.certified_at,
                        c.certifier_email,
                        f.facility_name,
                        o.operator_name,
                        s.application_revision_status,
                        cu.first_name as certified_by_first_name,
                        cu.last_name as certified_by_last_name
                      from ggircs_portal.certification_url c
                      left join ggircs_portal.ciip_user cu
                        on c.certified_by = cu.id
                      join (select application_id, max(version_number) as latest_version, max(created_at) as last_created
                        from ggircs_portal.certification_url
                        group by application_id) mx
                        on c.application_id = mx.application_id
                        and c.version_number = mx.latest_version
                        and c.created_at = mx.last_created
                      join ggircs_portal.application app
                        on c.application_id = app.id
                      join ggircs_portal.facility f
                        on app.facility_id = f.id
                      join ggircs_portal.organisation o
                        on f.organisation_id = o.id
                      join applicationStatus s
                        on app.id = s.application_id';

        if search_fields is null then
          raise notice'NULL';
          return query execute
            search_query || ' and certifier_email = ' || quote_literal(ciip_user.email_address) || ' limit 20 offset ' || offset_value;
        else
          case
          when array_length(search_fields, 1) = 1 then
            search_value_string := '%' || search_values[1] || '%';
            search_string := concat(' and ', search_string, search_fields[1], ' ilike ',quote_literal(search_value_string));
            RAISE NOTICE 'SEARCH STRING: %', search_string;

          else
            search_value_string := '%' || search_values[1] || '%';
            search_string := concat(' and ', search_string, search_fields[1],' ilike ', quote_literal(search_value_string));
            for i in 2 .. array_length(search_fields, 1)
              loop
                RAISE NOTICE 'search field: %', search_fields[i];
                RAISE NOTICE 'search value: %', search_values[i];
                search_value_string := '%' || search_values[i] || '%';
                search_string := concat(search_string, ' and ', search_fields[i],' ilike ', quote_literal(search_value_string));
              end loop;
              RAISE NOTICE 'SEARCH STRING: %', search_string;

          end case;

      return query execute
        search_query ||
        ' and certifier_email = ' || quote_literal(ciip_user.email_address)|| ' ' || search_string || order_by_string || ' limit 20 offset ' || offset_value;
      end if;
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.ciip_user_certification_requests to ciip_administrator, ciip_analyst, ciip_industry_user;

  comment on function ggircs_portal.ciip_user_certification_requests is 'Computed column returns all latest certification requests associated with a user email';

commit;
