set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;


select plan(2);

select has_function(
  'ggircs_portal', 'current_timestamp',
  'Function current_timestamp should exist'
);

select lives_ok('select ggircs_portal.current_timestamp()', 'Current timestamp should return a timestamp value and not raise an exception');

select finish();

rollback;
