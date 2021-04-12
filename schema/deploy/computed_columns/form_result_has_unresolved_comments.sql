-- Deploy ggircs-portal:function_form_result_has_unresolved_comments to pg
-- requires: table_form_result
-- requires: table_review_comment

begin;

  drop function ggircs_portal.form_result_has_unresolved_comments;

commit;
