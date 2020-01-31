-- Deploy ggircs-portal:database_functions/verify_grants to pg
-- requires: schema_ggircs_portal

begin;

  -- Verifies permission grants for all columns in a table
  create or replace function ggircs_portal.verify_grant(operation text, table_name_input text, role_name text)
  returns boolean
  as
  $function$
    declare
      valid_operations text[] := ARRAY['select', 'insert', 'update', 'delete', 'truncate', 'references', 'trigger'];
      op text;

    begin
      if (lower(operation) != all (valid_operations) and lower(operation) != 'all') then
        raise exception 'invalid operation variable. Must be one of [select, insert, update, delete, truncate, references, trigger]';
      else
        case
          when lower(operation) != 'all' then
            if (select true
               from information_schema.role_table_grants
               where table_schema='ggircs_portal'
               and lower(table_name)=lower(table_name_input)
               and lower(grantee)=lower(role_name)
               and lower(privilege_type)=lower(operation))
            then return true;
            else
              raise exception 'Grant: % on table % to role % does not exist', operation, table_name_input, role_name;
            end if;
          when lower(operation) = 'all' then
            foreach op in ARRAY valid_operations
            loop
              if (select true
               from information_schema.role_table_grants
               where table_schema='ggircs_portal'
               and lower(table_name)=lower(table_name_input)
               and lower(grantee)=lower(role_name)
               and lower(privilege_type)=lower(op))
                then continue;
              else
                raise exception 'Grant: % on table % to role % does not exist', op, table_name_input, role_name;
              end if;
            end loop;
            return true;
        end case;
      end if;
    end;
  $function$
  language 'plpgsql' stable;

  comment on function ggircs_portal.verify_grant(text, text, text) is 'A generic function for testing the existence of grants on a table';

  -- Verifies permission grants on specific columns in a table
  create or replace function ggircs_portal.verify_grant(operation text, table_name_input text, role_name text, column_names text[])
  returns boolean
  as
  $function$
    declare
      valid_operations text[] := ARRAY['select', 'insert', 'update', 'references'];
      op text;
      col text;

    begin
      if (lower(operation) != all (valid_operations) and lower(operation) != 'all') then
        raise exception 'invalid operation variable. Must be one of [select, insert, update, delete, truncate, references, trigger]';
      else
        case
          when lower(operation) != 'all' then
            foreach col in ARRAY column_names
              loop
                if (select true
                  from information_schema.role_column_grants
                  where table_schema='ggircs_portal'
                  and lower(table_name)=lower(table_name_input)
                  and lower(column_name)=lower(col)
                  and lower(grantee)=lower(role_name)
                  and lower(privilege_type)=lower(operation))
                then continue;
                else
                  raise exception 'Grant: % on column % in table % to role % does not exist', operation, col, table_name_input, role_name;
                end if;
              end loop;
              return true;
          when lower(operation) = 'all' then
            foreach col in ARRAY column_names
              loop
                foreach op in ARRAY valid_operations
                  loop
                    if (select true
                      from information_schema.role_column_grants
                      where table_schema='ggircs_portal'
                      and lower(table_name)=lower(table_name_input)
                      and lower(column_name)=lower(col)
                      and lower(grantee)=lower(role_name)
                      and lower(privilege_type)=lower(op))
                    then continue;
                    else
                      raise exception 'Grant: % on column % in table % to role % does not exist', op, col, table_name_input, role_name;
                    end if;
                  end loop;
              end loop;
              return true;
        end case;
      end if;

    end;
  $function$
  language 'plpgsql' stable;

  comment on function ggircs_portal.verify_grant(text, text, text, text[]) is 'A generic function for testing existence of grants on specific columns of a table';

commit;
