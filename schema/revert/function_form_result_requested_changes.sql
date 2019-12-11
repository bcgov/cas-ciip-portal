-- Revert ggircs-portal:function_requested_changes from pg

begin;

drop function ggircs_portal.form_result_requested_changes;

commit;
