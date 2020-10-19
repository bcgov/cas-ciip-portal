begin;

-- Init test environment
select test_helper.mock_open_window();
select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable','{
  "ciip_user_organisation":["_set_user_id"]
}');

-- Create test users
select test_helper.create_test_users();

-- Sets up test organisation to which access can be requested:
delete from ggircs_portal.organisation where id = 100;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (100, 'MacDonalds Agriculture, Ltd.');

commit;
