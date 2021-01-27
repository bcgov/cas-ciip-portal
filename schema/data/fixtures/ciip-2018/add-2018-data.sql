begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create 2018 reporting year
insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
overriding system value
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-08');

-- Create test users
select test_helper.create_test_users();

-- Create 2018 form_json/wizard rows
create temporary table admin_json(admin_json text) on commit drop;
\copy admin_json(admin_json) from '../schema/data/fixtures/ciip-2018/administration.json';
create temporary table emission_json(emission_json text) on commit drop;
\copy emission_json(emission_json) from '../schema/data/fixtures/ciip-2018/emission.json';
create temporary table fuel_json(fuel_json text) on commit drop;
\copy fuel_json(fuel_json) from '../schema/data/fixtures/ciip-2018/fuel.json';
create temporary table production_json(production_json text) on commit drop;
\copy production_json(production_json) from '../schema/data/fixtures/ciip-2018/production.json';
insert into ggircs_portal.form_json(
name,
slug,
short_name,
description,
form_json,
prepopulate_from_ciip,
prepopulate_from_swrs
) values
('admin', 'admin-2018', 'admin', 'admin', (select admin_json::jsonb from admin_json), false, false),
('emission', 'emission-2018', 'emission', 'emission', (select emission_json::jsonb from emission_json), false, false),
('fuel', 'fuel-2018', 'fuel', 'fuel', (select fuel_json::jsonb from fuel_json), false, false),
('production', 'production-2018', 'production', 'production', (select production_json::jsonb from production_json), false, false);

insert into ggircs_portal.ciip_application_wizard(form_id, form_position, is_active)
values
  (1,0,false),
  (2,1,false),
  (3,2,false),
  (4,3,false);

-- Create 2018 data
insert into ggircs_portal.organisation(operator_name) values ('test operator');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test 2018 facility');
insert into ggircs_portal.application(facility_id, reporting_year) values (1, 2018);
insert into ggircs_portal.application_revision(application_id,version_number,legal_disclaimer_accepted)
values (1,1,true);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
values (1,1,'approved');
create temporary table admin_result(admin_result text) on commit drop;
\copy admin_result(admin_result) from '../schema/data/fixtures/ciip-2018/admin_result.json';
insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
values
  (1,1,1,(select admin_result::jsonb from admin_result)),
  (1,1,2,'{}'),
  (1,1,3,'[{}]'),
  (1,1,4,'[{}]');
insert into ggircs_portal.form_result_status(application_id, form_id, form_result_status)
values
  (1,1,'approved'),
  (1,2,'approved'),
  (1,3,'approved'),
  (1,4,'approved');

-- Create approved user-organisation connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

commit;
