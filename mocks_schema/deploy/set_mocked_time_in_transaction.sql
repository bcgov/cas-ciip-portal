-- Deploy mocks:set_mocked_time_in_transaction to pg
-- requires: mock_now_method

BEGIN;

  create or replace function mocks.set_mocked_time_in_transaction(mocked_timestamp timestamptz)
  returns void as
  $function$
    declare
      parsed_epoch text;
    begin

      set search_path to mocks,public,pg_catalog;
      -- Converting timestamptz to unix epoch
      parsed_epoch := extract(epoch from mocked_timestamp)::text;
      perform set_config('mocks.mocked_timestamp', parsed_epoch, true);

    end;

  $function$ language plpgsql volatile;

COMMIT;
