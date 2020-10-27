-- Revert test_helpers:certify_application from pg

begin;

drop function test_helper.certify_application;

commit;
