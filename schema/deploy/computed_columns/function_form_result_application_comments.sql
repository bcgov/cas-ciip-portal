-- Deploy ggircs-portal:function_form_result_application_comments to pg
-- requires: table_review_comment
-- requires: table_form_result

begin;

  create or replace function ggircs_portal.form_result_application_comments(form_result ggircs_portal.form_result)
  returns setof ggircs_portal.review_comment
  as
  $body$
    declare
    begin
        return query (
          select * from ggircs_portal.review_comment rc
            where rc.application_id = form_result.application_id
            and rc.form_id = form_result.form_id
        );
    end;
  $body$
  language 'plpgsql' stable;
commit;
