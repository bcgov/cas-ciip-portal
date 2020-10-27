-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer true to skip checkboxes

begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(1, True, True);

-- Create approved user-organisationm connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Set legal disclaimer to be true
update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=1 and version_number=1;

-- Create products to be tested
insert into ggircs_portal.product(product_name, units, product_state, requires_emission_allocation, requires_product_amount)
  values
    ('non ciip','tonnes of aluminum produced','published', false, false),
    ('Aluminum Smelting','tonnes of aluminum produced','published', true, true);

commit;
