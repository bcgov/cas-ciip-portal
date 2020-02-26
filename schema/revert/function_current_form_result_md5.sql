-- Revert ggircs-portal:function_current_form_result_md5 from pg

begin;

drop function ggircs_portal_private.current_form_result_md5;

commit;
