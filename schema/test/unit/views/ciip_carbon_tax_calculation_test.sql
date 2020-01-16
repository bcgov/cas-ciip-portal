set client_encoding = 'utf-8';
set client_min_messages = warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

-- View should exist
select has_view(
    'ggircs_portal', 'ciip_carbon_tax_calculation',
    'ggircs_portal.ciip_carbon_tax_calculation should be a view'
);

-- Carbon tax calculator calculates correct tax for Butane
select is(
  (select carbon_tax_flat from ggircs_portal.ciip_carbon_tax_calculation where
    application_id = 1 and version_number = 1 and fuel_type = 'Butane'),
  28160.00,
  'Carbon tax calculator calculates correct tax for Butane'
);

select finish();

rollback;
