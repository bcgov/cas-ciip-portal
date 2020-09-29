-- Deploy test_helpers:truncate_function to pg
-- requires: schema_test_helper

BEGIN;

create or replace function test_helper.clean_ggircs_portal_schema()
returns void as
$function$
  declare
    table_name text;
	truncate_statement text;
  begin
    for table_name in
        select pg_tables.tablename as table_name from pg_tables where schemaname = 'ggircs_portal'
    loop
        raise notice 'Truncating %', table_name;
        truncate_statement:= format('truncate table ggircs_portal.%I cascade', table_name);
        execute truncate_statement;
    end loop;
  end;

$function$ language plpgsql volatile;

COMMIT;
