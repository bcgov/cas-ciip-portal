set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'get_carbon_tax_data',
  'Function get_carbon_tax_data should exist'
);

select * from ggircs_portal.get_carbon_tax_data() limit 1;

select isnt(
  (select fuel_charge from ggircs_portal.get_carbon_tax_data() limit 1),
  null,
  'The get_carbon_tax_data function should return a value');

select finish();

rollback;
