begin;

-- Init test environment

select test_helper.modify_triggers('disable');
-- Create test users
select test_helper.create_test_users();

insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
overriding system value
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-08'),
(2019, '2019-01-01 00:00:00.0-08', '2019-12-31 23:59:59.0-08', '2020-07-31 00:00:00.000000-07', '2020-07-03 00:00:00.000000-07', '2020-08-31 23:59:59.999999-07'),
(2020, '2020-01-01 00:00:00.0-08', '2020-12-31 23:59:59.0-08', '2021-06-01 00:00:00.000000-07', '2021-04-01 14:49:54.191757-07', '2021-12-30 14:49:54.191757-08'),
(2021, '2021-01-01 00:00:00.0-08', '2021-12-31 23:59:59.0-08', '2022-06-01 00:00:00.000000-07', '2022-04-01 14:49:54.191757-07', '2022-12-30 14:49:54.191757-08'),
(2022, '2022-01-01 00:00:00.0-08', '2022-12-31 23:59:59.0-08', '2023-06-01 00:00:00.000000-07', '2023-04-01 14:49:54.191757-07', '2023-12-30 14:49:54.191757-08'),
(2023, '2023-01-01 00:00:00.0-08', '2023-12-31 23:59:59.0-08', '2024-06-01 00:00:00.000000-07', '2024-04-01 14:49:54.191757-07', '2024-12-30 14:49:54.191757-08'),
(2024, '2024-01-01 00:00:00.0-08', '2024-12-31 23:59:59.0-08', '2025-06-01 00:00:00.000000-07', '2025-04-01 14:49:54.191757-07', '2025-12-30 14:49:54.191757-08'),
(2025, '2025-01-01 00:00:00.0-08', '2025-12-31 23:59:59.0-08', '2026-06-01 00:00:00.000000-07', '2026-04-01 14:49:54.191757-07', '2026-12-30 14:49:54.191757-08');

select * from ggircs_portal.reporting_year;
-- set current date to an open reporting period in 2020
select mocks.set_mocked_time_in_transaction('2020-07-04 14:49:54.191757-07'::timestamptz + interval '1 second');
-- Set the active form_json to what was in active use for the 2019 reporting year
update ggircs_portal.ciip_application_wizard set is_active = true where form_id=1;
update ggircs_portal.ciip_application_wizard set is_active = false where form_id=5;
-- Create 2019 applications(and necessary facilities/organisations)
select test_helper.create_applications(2, True, True);
-- Set current date to an open reporting period in 2021
select mocks.set_mocked_time_in_transaction('2021-07-04 14:49:54.191757-07'::timestamptz + interval '1 second');
-- Set the active form_json to what was in active use for the 2019 reporting year
update ggircs_portal.ciip_application_wizard set is_active = true where form_id=5;
update ggircs_portal.ciip_application_wizard set is_active = false where form_id=1;


-- Modify application #1 to be 'submitted' & then 'requested changes', 4 stays in draft
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_at)
  values (1,1,'submitted', now() + interval '1 minute');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_at)
  values (1,1,'requested changes', now() + interval '1 hour');


-- Create ciip user -> organisation access
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status)
  values (6, 1, 'approved'), (5, 1, 'approved'), (4, 1, 'approved'), (3, 1, 'approved'), (2, 1, 'approved'), (1, 1, 'approved');

select test_helper.modify_triggers('enable');

select * from ggircs_portal.application;
select * from ggircs_portal.application_revision_status;
select * from ggircs_portal.reporting_year;
select 'NEXT REPORTING YEAR';
select reporting_year from ggircs_portal.next_reporting_year();

commit;
