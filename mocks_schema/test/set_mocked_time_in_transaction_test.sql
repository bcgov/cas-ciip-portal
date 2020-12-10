set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

-- the method should take care of the search path for the transaction
-- no need to specify which `mocks()` we call

-- writing this test on Dec 7, 2020
-- 1) we verify that now() works
select is(
    now() > to_timestamp('DEC 07, 2020 09:20:00', 'MON DD, YYYY HH24:MI:SS'),
    true,
    'now() occurs after Dec 07 2020 at 9:20'
   );


-- 2) we verify that, if we call set_mocked_time_in_transaction, time travel is properly enabled
-- 925920000 is May 5th 1999 at 9am, as Unix Epoch, west coast time
select mocks.set_mocked_time_in_transaction('1999-05-05 09:00:00.000000-07'::timestamptz);
select is(
  now(),
  '1999-05-05 09:00:00.000000-07'::timestamptz,
  'now() occurs on may 5th, 1999 as set by mock method'
);


select finish();

rollback;
