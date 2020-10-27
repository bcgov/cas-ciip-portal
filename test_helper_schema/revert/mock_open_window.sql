-- Revert test_helpers:mock_open_window from pg

begin;

drop function test_helper.mock_open_window;

commit;
