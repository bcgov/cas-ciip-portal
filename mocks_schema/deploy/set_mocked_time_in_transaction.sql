-- Deploy mocks:set_mocked_time_in_transaction to pg
-- requires: mock_now_method

BEGIN;

  create or replace function mocks.set_mocked_time_in_transaction(mocked_timestamp timestamptz)
  returns void as
  $function$

    set search_path=mocks,"$user",public;
    set_config('mocks.mocked_timestamp', mocked_timestamp, true);

  $function$ language plpgsql volatile;

COMMIT;
