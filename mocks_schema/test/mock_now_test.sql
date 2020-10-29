set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(3);

-- 1) we verify that now() works
-- 2) we verify that, if we set the 'mocks.mocked_timestamp' value, now() defaults to that
-- 3) we verify that if we set the mocks.mocked_timestamp value to null? or removed? or invalid? we default to now()

-- writing this test on Oct 28th, 2020
select is(
    mocks.now() > to_timestamp('OCT 28, 2020 17:20:00', 'MON DD, YYYY HH24:MI:SS'),
    true,
    'now() occurs after october 28th 2020 at 17:20'
   );

select set_config('mocks.mocked_timestamp', '1999-05-05 09:00:00.000000-07', true);
select is(
  mocks.now(),
  '1999-05-05 09:00:00.000000-07'::timestamptz,
  'now() occurs on may 5th, 1999 as set in config value'
);

select set_config('mocks.mocked_timestamp', 'some_invalid_bs', true);
select is(
  mocks.now() > to_timestamp('OCT 28, 2020 17:20:00', 'MON DD, YYYY HH24:MI:SS'),
  true,
  'now() occurs after october 28th 2020 at 17:20'
);


select finish();

rollback;
