-- clear all data in benchmark & product tables
-- insert dummy data into benchmark & product tables for testing

begin;

delete from ggircs_portal.benchmark;
delete from ggircs_portal.product;

insert into ggircs_portal.product(
  id,
  product_name,
  units,
  product_state,
  is_ciip_product,
  requires_emission_allocation,
  requires_product_amount,
  subtract_exported_electricity_emissions,
  add_purchased_electricity_emissions,
  subtract_exported_heat_emissions,
  add_purchased_heat_emissions,
  subtract_generated_electricity_emissions,
  subtract_generated_heat_emissions,
  add_emissions_from_eios,
  is_read_only,
  updated_at
)
overriding system value
values
(1, 'Product A', 'tonnes','draft', true, true, true, true, true, true, true, true, true, true, false, '2018-01-01'),
(2, 'Product B', 'cubic meters', 'published', true, true, true, true, true, true, true, true, true, true, false, '2018-01-01'),
(3, 'Product C', 'unicorns per million', 'archived', true, true, true, true, true, true, true, true, true, true, true, '2018-01-01');

insert into ggircs_portal.benchmark(
  id,
  product_id,
  benchmark,
  eligibility_threshold,
  incentive_multiplier,
  start_reporting_year,
  end_reporting_year,
  created_at
)
overriding system value
values
(1, 1, 0.12, 0.15, 1, 2018, 2022, '2018-01-01'),
(2, 2, 888, 999, 1, 2018, 2022, '2018-01-01'),
(3, 3, 123, 456, 1, 2018, 2019, '2018-01-01'),
(4, 3, 789, 987, 1, 2019, 2022, '2019-01-01');

commit;
