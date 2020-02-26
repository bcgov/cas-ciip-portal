-- Deploy ggircs-portal:computed_columns/certification_url_hash_matches_current to pg
-- requires: function_current_form_result_md5
-- requires: tables/certification_url

begin;

  create or replace function ggircs_portal.certification_url_hash_matches(
    certification_url ggircs_portal.certification_url
  )
    returns boolean
    as
    $function$
    declare
    result boolean;
    current_md5 bytea;
    begin
        current_md5 := (select ggircs_portal_private.current_form_results_md5(certification_url.application_id, certification_url.version_number));
        select certification_url.form_result_md5 = current_md5 into result;
      return result;
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.certification_url_hash_matches to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
