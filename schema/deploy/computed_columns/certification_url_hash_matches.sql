-- Deploy ggircs-portal:computed_columns/certification_url_hash_matches_current to pg
-- requires: function_current_form_result_md5
-- requires: tables/certification_url

begin;

drop function ggircs_portal.certification_url_hash_matches;

commit;
