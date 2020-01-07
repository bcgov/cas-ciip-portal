set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

create schema if not exists mock;

create or replace function current_date


select plan(2);

select has_function(
  'ggircs_portal', 'opened_reporting_year', array[],
  'Function opened_reporting_year should exist'
);



select is(
  'The ciip_production view returns the correct count of products'
);

select finish();

rollback;
