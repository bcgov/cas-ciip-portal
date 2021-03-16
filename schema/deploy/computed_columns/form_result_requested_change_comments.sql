-- Deploy ggircs-portal:computer_columns/form_result_requested_change_comments to pg
-- requires: tables/form_result
-- requires: tables/review_comment

begin;

  drop function ggircs_portal.form_result_requested_change_comments;

commit;
