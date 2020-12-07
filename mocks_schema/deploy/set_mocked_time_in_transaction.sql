-- Deploy mocks:set_mocked_time_in_transaction to pg
-- requires: mock_now_method

BEGIN;

  -- Takes a unit epoch
  -- `timestamptz` can be converted with `extract(epoch from value::timestamptz)`
  create or replace function mocks.set_mocked_time_in_transaction(mocked_timestamp int)
  returns void as
  $function$
    begin

      set search_path to mocks,public,pg_catalog;
      perform set_config('mocks.mocked_timestamp', mocked_timestamp::text, true);

    end;

  $function$ language plpgsql volatile;

COMMIT;
