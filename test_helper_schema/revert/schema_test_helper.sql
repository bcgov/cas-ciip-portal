-- Revert test_helpers:schema_test_helper from pg

begin;

drop schema test_helper;

commit;
