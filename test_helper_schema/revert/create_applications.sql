-- Revert test_helpers:create_applications from pg

begin;

drop function test_helper.create_applications;

commit;
