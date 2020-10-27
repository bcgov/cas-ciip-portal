-- insert dummy data into benchmark & product tables for testing

begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');
-- Create test users
select test_helper.create_test_users();

-- Create products to be tested
select test_helper.create_product(id => 11, product_name => 'Product A', units => 'tonnes', is_read_only => false);
select test_helper.create_product(id => 12, product_name => 'Product B', units => 'cubic meters', product_state => 'published', is_read_only => false);
select test_helper.create_product(id => 13, product_name => 'Product C', units => 'unicorns per million', product_state => 'archived');
select test_helper.create_product(id => 14, product_name => 'Product D', units => 'kilolitres', product_state => 'published');

-- Add reporting years for benchmark inserts
insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
overriding system value
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-08'),
(2022, '2022-01-01 00:00:00.0-08', '2022-12-31 23:59:59.0-08', '2023-06-01 00:00:00.000000-07', '2023-04-01 14:49:54.191757-07', '2023-12-30 14:49:54.191757-08');

-- Create benchmarks
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
