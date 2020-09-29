-- Revert test_helpers:modify_triggers from pg

begin;

drop function test_helper.modify_triggers(text);

commit;
