set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;


select plan(1);

select has_function(
  'ggircs_portal', 'current_timestamp',
  'Function current_timestamp should exist'
);

select finish();

rollback;
