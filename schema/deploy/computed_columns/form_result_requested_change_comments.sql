-- Deploy ggircs-portal:computer_columns/form_result_requested_change_comments to pg
-- requires: tables/form_result
-- requires: tables/review_comment

begin;

  create or replace function ggircs_portal.form_result_requested_change_comments(form_result ggircs_portal.form_result)
  returns setof ggircs_portal.review_comment
  as
  $body$
    declare
    begin
        return query (
          select * from ggircs_portal.review_comment rc
            where rc.application_id = form_result.application_id
            and rc.form_id = form_result.form_id
            and rc.comment_type = 'requested change'::ggircs_portal.review_comment_type
            and rc.deleted_by is null
        );
    end;
  $body$
  language 'plpgsql' stable;
commit;
