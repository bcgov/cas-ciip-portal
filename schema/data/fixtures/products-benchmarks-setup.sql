-- clear all data in benchmark & product tables
-- insert dummy data into benchmark & product tables for testing

begin;

truncate ggircs_portal.product cascade;

select test_helper.create_product(id => 11, product_name => 'Product A', units => 'tonnes', is_read_only => false);
select test_helper.create_product(id => 12, product_name => 'Product B', units => 'cubic meters', product_state => 'published', is_read_only => false);
select test_helper.create_product(id => 13, product_name => 'Product C', units => 'unicorns per million', product_state => 'archived');
select test_helper.create_product(id => 14, product_name => 'Product D', units => 'kilolitres', product_state => 'published');

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
(1111, 11, 0.12, 0.15, 1, 2018, 2022, '2018-01-01'),
(2222, 12, 888, 999, 1, 2018, 2022, '2018-01-01'),
(3333, 13, 123, 456, 1, 2018, 2019, '2018-01-01'),
(4444, 13, 789, 987, 1, 2019, 2022, '2019-01-01'),
(5555, 14, 789, 987, 1, 2019, 2022, '2019-01-01');

commit;
