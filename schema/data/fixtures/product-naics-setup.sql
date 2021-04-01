-- insert dummy data into benchmark & product tables for testing

begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');
-- Create test users
select test_helper.create_test_users();

-- Create products
select test_helper.create_product(product_id => 11, product_name => 'Product A', units => 'tonnes', product_state => 'published');
select test_helper.create_product(product_id => 12, product_name => 'Product B', units => 'cubic meters', product_state => 'published');
select test_helper.create_product(product_id => 13, product_name => 'Product C', units => 'unicorns per million', product_state => 'published');
select test_helper.create_product(product_id => 14, product_name => 'Product D', units => 'kilolitres', product_state => 'published');

-- Create naics codes
insert into ggircs_portal.naics_code(naics_code, ciip_sector, naics_description)
values
('111419', 'Greenhouses', 'Food Crops Grown Under Cover'),
('211110', 'Oil and Gas extraction', 'Oil and Gas extraction (except oil sands)'),
('212114', 'Coal Mining', 'Bituminous Coal Mining'),
('212220', 'Metal Mining', 'Gold and Silver Ore Mining'),
('212231', 'Metal Mining', 'Lead-zinc ore mining');

commit;
