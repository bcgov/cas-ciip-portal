set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'application_ordered_form_results',
  'Function application_ordered_form_results should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
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
select test_helper.create_applications(2, True, True);

-- Set admin form_result with application_id=2 to point to a deprecated form_json
update ggircs_portal.form_result set form_id=1 where application_id=2 and form_id=5;

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=2)
    select form_id from ggircs_portal.application_ordered_form_results((select * from record), '1');
  $$,
    ARRAY[1,2,3,4],
  'application_ordered_form_results retrieves all form results with a deprecated form_json'
);

select results_eq (
  $$
    with record as (select row(application.*)::ggircs_portal.application from ggircs_portal.application where id=1)
    select form_id from ggircs_portal.application_ordered_form_results((select * from record), '1');
  $$,
    ARRAY[5,2,3,4],
  'application_ordered_form_results retrieves all form results with active form_json'
);

select finish();
rollback;
