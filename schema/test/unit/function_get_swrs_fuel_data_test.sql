set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'get_swrs_fuel_data', array['integer', 'integer'],
  'Function get_swrs_fuel_data should exist'
);

select is(
  (select report_id from ggircs_portal.get_swrs_fuel_data(458475, 2016) limit 1),
  2,
  'The get_swrs_fuel_data function should return a value');

select finish();

rollback;
