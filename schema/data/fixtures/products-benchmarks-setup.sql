-- clear all data in benchmark & product tables
-- insert dummy data into benchmark & product tables for testing

begin;

delete from ggircs_portal.benchmark;
delete from ggircs_portal.product;

insert into ggircs_portal.product(id, name, description, units, state, requires_emission_allocation, includes_exported_electricity, includes_imported_electricity, includes_exported_heat, includes_imported_heat)
overriding system value
values
(1, 'Product A', 'Description A', 'tonnes','active', true, true, true, true, true),
(2, 'Product B', 'Description B', 'cubic meters', 'active', true, true, true, true, true);

insert into ggircs_portal.benchmark(
  id,
  product_id,
  benchmark,
  eligibility_threshold,
  incentive_multiplier,
  start_reporting_year,
  end_reporting_year
)
overriding system value
values
(1, 1, 0.12, 0.15, 1, 2018, 2022),
(2, 2, 888, 999, 1, 2018, 2022);

commit;
