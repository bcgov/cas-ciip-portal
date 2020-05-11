set client_encoding = 'utf-8';
set client_min_messages = warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

-- View should exist
select has_view(
    'ggircs_portal', 'ciip_carbon_tax_calculation',
    'ggircs_portal.ciip_carbon_tax_calculation should be a view'
);

update ggircs_portal.form_result
  set form_result = '[
    {
      "fuelRowId": 11,
      "quantity": 400,
      "fuelUnits": "kL",
      "emissionCategoryRowId": 2
    }
  ]'
  where form_id = 3
  and application_id = 1
  and version_number = 1;

-- Carbon tax calculator calculates correct tax for Butane
select is(
  (select carbon_tax_flat from ggircs_portal.ciip_carbon_tax_calculation where
    application_id = 1 and version_number = 1 and fuel_type = 'Butane'),
  24640.00,
  'Carbon tax calculator calculates correct tax for Butane'
);

-- Add a fuel in the Other, non-carbontaxed emission category to the form result
update ggircs_portal.form_result
  set form_result = '[
    {
      "fuelRowId": 11,
      "quantity": 400,
      "fuelUnits": "kL",
      "emissionCategoryRowId": 2
    },
    {
      "fuelRowId": 1,
      "quantity": 4000,
      "fuelUnits": "kL",
      "emissionCategoryRowId": 9
    }
  ]'
  where form_id = 3
  and application_id = 1
  and version_number = 1;

select is(
  (select carbon_tax_flat from ggircs_portal.ciip_carbon_tax_calculation where
    application_id = 1 and version_number = 1),
  24640.00,
  'Carbon tax calculator ignores fuels in emission category: Other, non-carbontaxed'
);

select finish();

rollback;
