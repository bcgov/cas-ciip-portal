set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(9);

select has_function(
  'ggircs_portal_private', 'checksum_form_results',
  'Function checksum_form_results should exist'
);

-- Test setup
select test_helper.clean_ggircs_portal_schema();
select test_helper.mock_open_window();
select test_helper.modify_triggers('enable');
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;
select test_helper.create_test_users();
select test_helper.create_applications(2, False, True);
insert into ggircs_portal.review_step (step_name, is_active) values ('test_step1', true);
insert into ggircs_portal.review_step (step_name, is_active) values ('test_step2', true);
insert into ggircs_portal.review_step (step_name, is_active) values ('no_step', false);
insert into ggircs_portal.application_review_step (application_id, review_step_id, is_complete)
  values (2,1,true), (2,2,true);


select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1;
  $$,
  ARRAY[0::bigint],
  'No review_steps exist for application with id=1'
);

-- Trigger does not fire for application_revision_status changes other than 'submitted'
insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (1,1,'approved');

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1;
  $$,
  ARRAY[0::bigint],
  'Trigger did not fire on status changed to approved'
);

insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (1,1,'rejected');

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1;
  $$,
  ARRAY[0::bigint],
  'Trigger did not fire on status changed to rejected'
);

insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (1,1,'requested changes');

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1;
  $$,
  ARRAY[0::bigint],
  'Trigger did not fire on status changed to requested changes'
);

insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (1,1,'draft');

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1;
  $$,
  ARRAY[0::bigint],
  'Trigger did not fire on status changed to draft'
);

-- Fire trigger by submitting an application with no existing review_steps
insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (1,1,'submitted');

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1 and review_step_id in (1,2);
  $$,
  ARRAY[2::bigint],
  'Trigger function creates application_review_step rows for each active reivew_step_name'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step where application_id=1 and review_step_id=3;
  $$,
  ARRAY[0::bigint],
  'Trigger function does not create application_review_step rows for inactive reivew_step_names'
);

-- Fire trigger by submitting an application with existing review_steps with is_complete set to true
insert into ggircs_portal.application_revision_status (application_id, version_number, application_revision_status)
  values (2,1,'submitted');

select results_eq(
  $$
    select is_complete from ggircs_portal.application_review_step where application_id=2;
  $$,
  ARRAY[false::boolean, false::boolean],
  'Trigger function sets is_complete column to false when review_steps already exist'
);

select finish();

rollback;
