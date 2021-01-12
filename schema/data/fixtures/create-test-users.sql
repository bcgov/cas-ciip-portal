begin;

-- Init test environment
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

commit;
