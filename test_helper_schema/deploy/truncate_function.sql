-- Deploy test_helpers:truncate_function to pg
-- requires: schema_test_helper

BEGIN;

create or replace function test_helper.clean_ggircs_portal_schema()
returns void as
$function$

  begin
    execute (select 'TRUNCATE TABLE '
    || string_agg(format('ggircs_portal.%I', tablename), ', ')
    || ' RESTART IDENTITY CASCADE'
    from pg_tables
    where schemaname = 'ggircs_portal');
  end

$function$ language plpgsql volatile;

COMMIT;
