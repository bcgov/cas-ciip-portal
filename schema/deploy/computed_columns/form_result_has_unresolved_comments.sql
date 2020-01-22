-- Deploy ggircs-portal:function_form_result_has_unresolved_comments to pg
-- requires: table_form_result
-- requires: table_review_comment

begin;

  create or replace function ggircs_portal.form_result_has_unresolved_comments(form_result ggircs_portal.form_result)
  returns boolean
  as
  $body$
    declare
    begin
        return (select exists(select * from ggircs_portal.review_comment rc
                             where rc.application_id = form_result.application_id
                             and rc.form_id = form_result.form_id
                             and rc.comment_type = 'requested change')
                             and rc.deleted_by is null);
    end;
  $body$
  language 'plpgsql' stable;

commit;
