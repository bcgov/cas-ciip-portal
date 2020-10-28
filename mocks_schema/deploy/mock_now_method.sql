-- Deploy mocks:mock_now_method to pg
-- requires: schema_mocks

BEGIN;

  create or replace function mocks.now()
  returns timestamptz as
  $function$
    begin
      -- look at the database options if there is a value set
      -- if it's not set the current_setting method returns nil and we coalesce to 'false'
      return coalesce(
          current_setting('mocks.mocked_timestamp', true),
          pg_catalog.now()::text
      );
    end;
  $function$ language plpgsql volatile;

COMMIT;
