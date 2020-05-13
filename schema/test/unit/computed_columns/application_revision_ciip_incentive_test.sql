set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select * from no_plan();

-- Set the timestamp to the start of the 2018 reporting year reporting window
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  where reporting_year = 2018;
$$ language sql;

-- setup products and benchmarks
truncate ggircs_portal.product, ggircs_portal.application restart identity cascade;
insert into ggircs_portal.product (
  id, product_name, product_state,
  requires_emission_allocation,
  is_ciip_product,
  requires_product_amount,
  add_purchased_electricity_emissions,
  subtract_exported_electricity_emissions,
  add_purchased_heat_emissions,
  subtract_exported_heat_emissions,
  subtract_generated_electricity_emissions,
  subtract_generated_heat_emissions,
  add_emissions_from_eios
)
overriding system value
values
  (1, 'simple product (no allocation, emissions = facility emissions)', 'published',
  false, true, true, false, false, false, false, false, false, false),
  (2, 'product A with allocation of emissions', 'published',
  true, true, true, false, false, false, false, false, false, false),
  (3, 'product B with allocation of emissions', 'published',
  true, true, true, false, false, false, false, false, false, false),
  (4, 'non-ciip product', 'published',
  true, false, true, false, false, false, false, false, false, false),
  (5, 'product with added purchased electricity emissions', 'published',
  false, true, true, true, false, false, false, false, false, false),
  (6, 'product with excluded exported electricity emissions', 'published',
  false, true, true, false, true, false, false, false, false, false),
  (7, 'product with added purchased heat emissions', 'published',
  false, true, true, false, false, true, false, false, false, false),
  (8, 'product with excluded exported heat emissions', 'published',
  false, true, true, false, false, false, true, false, false, false),
  (9, 'product with excluded generated electricity emissions', 'published',
  false, true, true, false, false, false, false, true, false, false),
  (10, 'product with excluded generated heat emissions', 'published',
  false, true, true, false, false, false, false, false, true, false),
  (11, 'Purchased electricity', 'published',
  true, false, true, false, false, false, false, false, false, false),
  (12, 'Exported electricity', 'published',
  true, true, true, false, false, false, false, false, false, false),
  (13, 'Purchased heat', 'published',
  true, false, true, false, false, false, false, false, false, false),
  (14, 'Exported heat', 'published',
  true, true, true, false, false, false, false, false, false, false),
  (15, 'Electricity generated on site', 'published',
  true, false, true, false, false, false, false, false, false, false),
  (16, 'Heat generated on site', 'published',
  true, false, true, false, false, false, false, false, false, false),
  (17, 'product with added EIO emissions', 'published',
  false, true, true, false, false, false, false, false, false, true),
  (18, 'Emissions from EIOs', 'published',
  true, false, true, false, false, false, false, false, false, false)
;

insert into ggircs_portal.benchmark
(
  id,
  product_id,
  benchmark,
  eligibility_threshold,
  incentive_multiplier,
  start_reporting_year,
  end_reporting_year,
  minimum_incentive_ratio,
  maximum_incentive_ratio
)
overriding system value
values
(1, 1, 0.25, 0.75, 1, 2018, 2018, 0, 1),
(2, 2, 0.10, 0.30, 1, 2018, 2018, 0, 1),
(3, 3, 0, 1, 1, 2018, 2018, 0.42, 0.42),
(4, 5, 0, 1, 1, 2018, 2018, 0.42, 0.42),
(5, 6, 0, 1, 1, 2018, 2018, 0.42, 0.42),
(6, 7, 0, 1, 1, 2018, 2018, 0.42, 0.42),
(8, 9, 0, 1, 1, 2018, 2018, 0.42, 0.42),
(9, 17, 0, 1, 1, 2018, 2018, 0.42, 0.42);


alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Set a jwt token so that the created_by columns are not null on creation of application;
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

-- Create application
select ggircs_portal.create_application_mutation_chain(1);

-- Add gases to have emissions associated to the facility
-- Total emissions is 50 tCO2e
update ggircs_portal.form_result
set form_result = '{
  "sourceTypes": [
    {
      "gases": [
        {
          "gwp": 1,
          "gasType": "CO2nonbio",
          "annualCO2e": 50,
          "annualEmission": 50,
          "gasDescription": "Carbon dioxide from non-biomass"
        }
      ]
    }
  ]
}'
where application_id = 1 and version_number = 1 and form_id = 2;

-- Add a fuel to have a carbon tax amount associated to the facility
update ggircs_portal.form_result
set form_result = '[{"fuelRowId": 13, "quantity": 10, "fuelUnits": "kL"}]'
where application_id = 1 and version_number = 1 and form_id = 3;

select has_function(
  'ggircs_portal', 'application_revision_ciip_incentive', ARRAY['ggircs_portal.application_revision'],
  'Function application_revision_ciip_incentive should exist'
);

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'The application_revision_ciip_incentive function returns an empty result set if there are no products'
);

-- Report a single product with no allocation of emissions
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 1,
    "productAmount": 100
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select incentive_ratio from ggircs_portal.application_revision_ciip_incentive((select * from record))
  ),
  0.5,
  'the correct incentive ratio is returned with a simple product with no allocation of emissions'
);

-- Report 2 ciip products with allocation and one non-ciip product
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 2,
    "productAmount": 100,
    "productEmissions": 15
  },
  {
    "productRowId": 3,
    "productAmount": 100,
    "productEmissions": 5
  },
  {
    "productRowId": 4,
    "productAmount": 100,
    "productEmissions": 20
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select incentive_ratio
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 2
  ),
  0.75,
  'the correct incentive ratio is returned with a product with allocation of emissions'
);

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select payment_allocation_factor
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 2
  ),
  0.75, -- product 2 has 15t and product 3 5t,
  'payment is automatically allocated between ciip products based on their share of emissions'
);

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select incentive_ratio
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 3
  ),
  0.42,
  'incentive ratio is bound by minimum and maximum'
);


-- Report a product with no allocation of emissions which requires "Purchased Electricity" to be reported
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 5,
    "productAmount": 100
  },
  {
    "productRowId": 11,
    "productAmount": 42,
    "productEmissions": 11
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select product_emissions
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 5
  ),
  61.0,
  'purchased electricity emissions are added to the facility emissions for products that require it'
);

-- Report a product with no allocation of emissions which requires "Purchased Heat" to be reported
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 6,
    "productAmount": 100
  },
  {
    "productRowId": 12,
    "productAmount": 42,
    "productEmissions": 12
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select product_emissions
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 6
  ),
  38.0,
  'exported electricity emissions are added to the facility emissions for products that require it'
);

-- Report a product with no allocation of emissions which requires "Exported Electricity" to be reported
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 7,
    "productAmount": 100
  },
  {
    "productRowId": 13,
    "productAmount": 42,
    "productEmissions": 13
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select product_emissions
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 7
  ),
  63.0,
  'purchased heat emissions are removed from the facility emissions for products that require it'
);

-- Report a product with no allocation of emissions which requires "Expported Heat" to be reported
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 8,
    "productAmount": 100
  },
  {
    "productRowId": 14,
    "productAmount": 42,
    "productEmissions": 14
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select product_emissions
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 8
  ),
  36.0,
  'exported heat emissions are removed from the facility emissions for products that require it'
);

-- Report a product with no allocation of emissions which requires "EIO Emissions" to be reported
update ggircs_portal.form_result
set form_result = '[
  {
    "productRowId": 17,
    "productAmount": 100
  },
  {
    "productRowId": 18,
    "productAmount": 42,
    "productEmissions": 11
  }
]'
where application_id = 1 and version_number = 1 and form_id = 4;

select is(
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    )
    select product_emissions
    from ggircs_portal.application_revision_ciip_incentive(
      (select * from record)
    ) where product_id = 17
  ),
  61.0,
  'EIO Emissions are added to the facility emissions for products that require it'
);

-- Test roles
set role ciip_administrator;

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'ciip_administrator can execute the application_revision_ciip_incentive function'
);

set role ciip_analyst;

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'ciip_analyst can execute the application_revision_ciip_incentive function'
);

set role ciip_industry_user;

select throws_like(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
  'permission denied%',
    'ciip_industry_user cannot execute the application_revision_ciip_incentive function'
);

set role ciip_guest;

select throws_like(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
  'permission denied%',
    'ciip_guest cannot execute the application_revision_ciip_incentive function'
);

select finish();
rollback;
