-- Deploy mocks:mock_now_method to pg
-- requires: schema_mocks

BEGIN;


  create or replace function mocks.now()
  returns timestamptz as
  $function$
    declare
      mockedValue text;
      returnValue timestamptz;
    begin
      -- look at the database options if there is a value set
      -- if it's not set the current_setting method returns nil and we return now()
      mockedValue := current_setting('mocks.mocked_timestamp', true);

      if mockedValue is null then
        returnValue := pg_catalog.now()::timestamptz;
      else
        returnValue := to_timestamp(mockedValue::integer)::timestamptz;
      end if;

      return returnValue;

    exception
      -- In case of a parsing error or anything else, we return the regular now() behaviour
      when others then
        raise notice 'mocks.now() encountered an error and defaulted back to the regular behaviour';
        return pg_catalog.now();
    end;
  $function$ language plpgsql volatile;

COMMIT;
