-- Deploy ggircs-portal:function_form_result_application_comments to pg
-- requires: table_review_comment
-- requires: table_form_result

begin;

  create or replace function ggircs_portal.form_result_internal_general_comments(form_result ggircs_portal.form_result)
  returns setof ggircs_portal.review_comment
  as
  $body$
    declare
    begin
        return query (
          select * from ggircs_portal.review_comment rc
            where rc.application_id = form_result.application_id
            and rc.form_id = form_result.form_id
            and rc.comment_type != 'requested change':: ggircs_portal.review_comment_type
            and rc.deleted_by is null
        );
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.form_result_internal_general_comments to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
