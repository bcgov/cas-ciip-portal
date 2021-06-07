begin;

-- Init test environment
select test_helper.mock_open_window();

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(2, False, True);

-- Modify application #2 to be 'submitted'
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1,'submitted');

-- Add a naics code
insert into ggircs_portal.naics_code(naics_code, ciip_sector, naics_description) values ('1234', 'sector', 'code description');

alter table ggircs_portal.product disable trigger _protect_read_only_products;
update ggircs_portal.product set is_ciip_product = true;
alter table ggircs_portal.product enable trigger _protect_read_only_products;

commit;
