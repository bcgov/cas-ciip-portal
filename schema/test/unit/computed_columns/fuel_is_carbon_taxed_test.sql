set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'fuel_is_carbon_taxed', array['ggircs_portal.fuel'],
  'Function ggircs_portal.fuel_is_carbon_taxed should exist'
);

select finish();

rollback;
