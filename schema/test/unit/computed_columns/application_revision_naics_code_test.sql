set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'application_revision_naics_code', array['ggircs_portal.application_revision'],
  'Function ggircs_portal.application_revision_naics_code should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
truncate ggircs_portal.naics_code restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(1, True, True);
update ggircs_portal.form_result set form_result = '{"operator": {"naics": "123456"}}'
where application_id=1
  and version_number=1
  and form_id=(select id from ggircs_portal.form_json where slug = 'admin-2020');

insert into ggircs_portal.naics_code(naics_code, naics_description) values ('123456', 'test naics'), ('654321', 'test naics2');

select is (
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    ) select naics_code from ggircs_portal.application_revision_naics_code((select * from record))
  ),
  '123456'::varchar,
  'Returns the proper naics code for an application revision'
);

select finish();

rollback;
