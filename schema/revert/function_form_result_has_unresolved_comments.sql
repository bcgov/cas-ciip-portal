-- Revert ggircs-portal:function_form_result_has_unresolved_comments from pg

begin;

drop function ggircs_portal.has_unresolved_comments;

commit;
