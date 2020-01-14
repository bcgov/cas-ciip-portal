set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;


select plan(2);

select has_function(
  'ggircs_portal', 'current_timestamp',
  'Function current_timestamp should exist'
);

select results_eq('select ggircs_portal.current_timestamp()', 'select current_timestamp', 'The current_timestamp function returns the current timestamp');

select finish();

rollback;
