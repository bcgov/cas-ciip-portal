set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_function(
  'ggircs_portal_private', 'refresh_swrs_version_data',
  'Function refresh_swrs_version_data should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_100_timestamps"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(4, True, True);

update ggircs_portal.application set report_id = 1 where id = 1;
update ggircs_portal.application set report_id = 2 where id = 2;
update ggircs_portal.application set report_id = 3 where id = 3;
update ggircs_portal.application set report_id = 5 where id = 4;

update ggircs_portal.facility set report_id = 1, swrs_facility_id = 1 where id = 1;
update ggircs_portal.facility set report_id = 2, swrs_facility_id = 2 where id = 2;
update ggircs_portal.facility set report_id = 3, swrs_facility_id = 3 where id = 3;
update ggircs_portal.facility set report_id = 5, swrs_facility_id = 5 where id = 4;

update ggircs_portal.organisation set report_id = 1 where id = 1;
update ggircs_portal.organisation set report_id = 2 where id = 2;
update ggircs_portal.organisation set report_id = 3 where id = 3;
update ggircs_portal.organisation set report_id = 5 where id = 4;


update swrs.report set swrs_facility_id = 1 where id = 1;
update swrs.report set swrs_facility_id = 2 where id = 2;
update swrs.report set swrs_facility_id = 3 where id = 3;
update swrs.report set swrs_facility_id = 5 where id = 4;

select '+++++++++++++++++++++++++++';
select id, swrs_facility_id from swrs.report;

insert into ggircs_portal.application_revision(application_id, version_number)
  values (1, 0), (3, 0), (4, 0);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1, 0, 'submitted'),(3, 0, 'submitted'),(4, 0, 'submitted');

insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
  values
    (1, 0, 1, '{}'),
    (1, 0, 2, '{}'),
    (1, 0, 3, '[{}]'),
    (1, 0, 4, '[{}]'),
    (3, 0, 1, '{}'),
    (3, 0, 2, '{}'),
    (3, 0, 3, '[{}]'),
    (3, 0, 4, '[{}]'),
    (4, 0, 1, '{}'),
    (4, 0, 2, '{}'),
    (4, 0, 3, '[{}]'),
    (4, 0, 4, '[{}]');

update ggircs_portal.form_result set updated_at = now() - interval '3 days' where application_id < 3;
update ggircs_portal.form_result set updated_at = now() - interval '1 day' where application_id >= 3;

select test_helper.modify_triggers('enable');

update swrs.report set imported_at = now() - interval '2 days';
update swrs.report set reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year());

select reporting_period_duration from swrs.report;
select reporting_year from ggircs_portal.application;


select application_id, form_id from ggircs_portal.form_result where version_number = 0 order by application_id, form_id;

select ggircs_portal_private.refresh_swrs_version_data();

select application_id, form_id from ggircs_portal.form_result where version_number = 0 order by application_id, form_id;

select application_id, form_id, updated_at, form_result from ggircs_portal.form_result where version_number = 0 and form_id !=2 order by application_id, form_id;

select finish();

rollback;
