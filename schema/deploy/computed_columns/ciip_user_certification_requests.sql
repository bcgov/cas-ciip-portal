-- Deploy ggircs-portal:function_ciip_user_certification_requests to pg
-- requires: table_ciip_user
-- requires: table_certification_url
-- requires: table_application

begin;

  -- create or replace function ggircs_portal.ciip_user_certification_requests(
  create or replace function ggircs_portal.test_func(
    -- ciip_user ggircs_portal.ciip_user,
    search_fields text[],
    search_values text[],
    order_by_field text,
    direction text
  )
  returns setof ggircs_portal.certification_url
  as
  $body$
    declare
      search_string text;
      order_by_string text;
      email text;
      join_clause text;
    begin
      email := 'certifier@certi.fy';
      order_by_string := concat(' order by ', order_by_field, ' ', direction);
      join_clause := 'join (select application_id, max(version_number) as latest_version, max(created_at) as last_created
                      from ggircs_portal.certification_url
                      group by application_id) mx
                      on c.application_id = mx.application_id
                      and c.version_number = mx.latest_version
                      and c.created_at = mx.last_created';

        if search_fields is null then
          raise notice'NULL';
          return query execute
            'select c.* from ggircs_portal.certification_url c ' || join_clause || ' and certifier_email = ' || quote_literal(email);
        else
          case
          when array_length(search_fields, 1) = 1 then
            search_string := concat(' and ', search_string, search_fields[1],'=',quote_literal(search_values[1]),'');
            RAISE NOTICE 'SEARCH STRING: %', search_string;

          else
            search_string := concat(' and ', search_string, search_fields[1],'=', quote_literal(search_values[1]));
            for i in 2 .. array_length(search_fields, 1)
              loop
                RAISE NOTICE 'search field: %', search_fields[i];
                RAISE NOTICE 'search value: %', search_values[i];
                search_string := concat(search_string, ' and ', search_fields[i],'=', quote_literal(search_values[i]));
              end loop;
              RAISE NOTICE 'SEARCH STRING: %', search_string;

          end case;

      -- ciip_user.email_address
      return query execute
        'select c.* from ggircs_portal.certification_url c '
        || join_clause ||
        ' and certifier_email = ' || quote_literal(email)|| ' ' || search_string || order_by_string;
      end if;
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.ciip_user_certification_requests to ciip_administrator, ciip_analyst, ciip_industry_user;

  comment on function ggircs_portal.ciip_user_certification_requests is 'Computed column returns all latest certification requests associated with a user email';

commit;
