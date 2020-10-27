-- Revert test_helpers:create_test_users from pg

begin;

drop function test_helper.create_test_users;

commit;
