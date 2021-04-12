-- Deploy ggircs-portal:function_form_result_application_comments to pg
-- requires: table_review_comment
-- requires: table_form_result

begin;

  drop function ggircs_portal.form_result_internal_general_comments;

commit;
