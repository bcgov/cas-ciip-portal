set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select * from no_plan();

/** TEST SETUP **/
truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.form_result restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_immutable_form_result"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;
select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(5, True, True);

-- select test_helper.validate_form_result_data(1, 1, 1);

select * from ggircs_portal.form_result;
select * from ggircs_portal.form_json;

select is (
  (select 1=1),
  true::boolean,
  'obviously'
);

select finish();
rollback;
