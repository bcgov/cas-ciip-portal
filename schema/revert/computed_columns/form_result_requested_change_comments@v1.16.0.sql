-- Revert ggircs-portal:computer_columns/form_result_requested_change_comments from pg

begin;

drop function ggircs_portal.form_result_requested_change_comments;

commit;
