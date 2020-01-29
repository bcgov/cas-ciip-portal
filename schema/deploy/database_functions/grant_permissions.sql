-- Deploy ggircs-portal:database_functions/grant_permissions to pg
-- requires: database_functions/create_roles

begin;

  create or replace function ggircs_portal.grant_permissions(operation text, column_names text[], table_name text, role_name text)
  returns void
  as
  $function$
    declare
      column_name text;
    begin
      if (lower(operation) not in ('select', 'insert', 'update', 'delete')) then
        raise exception 'invalid operation variable. Must be one of [select, insert, update, delete]';
      elsif (column_names is null) then
        execute format('grant ' || quote_ident(operation) || ' on ggircs_portal.'||quote_ident(table_name) || ' to ' || quote_ident(role_name));
      else
        foreach column_name in ARRAY column_names
        loop
          execute format('grant ' || quote_ident(operation) || ' (' || quote_ident(column_name) ||') on ggircs_portal.'|| quote_ident(table_name) || ' to ' || quote_ident(role_name));
        end loop;
      end if;
    end;
  $function$
  language 'plpgsql' volatile;

commit;
