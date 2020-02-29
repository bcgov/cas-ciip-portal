-- Deploy ggircs-portal:computed_columns/application_revision_certification_signature_is_valid to pg
-- requires: tables/application_revision
-- requires: function_current_form_result_md5

begin;

create or replace function ggircs_portal.application_revision_certification_signature_is_valid(
  application_revision ggircs_portal.application_revision
)
  returns boolean
  as
    $function$
    declare
      sig bytea;
      md5_hash bytea;
    begin
      select certification_signature from ggircs_portal.application_revision_certification_url(application_revision) into sig;
      select form_results_md5 from ggircs_portal.application_revision_certification_url(application_revision) into md5_hash;

      if sig is null then
        return false;
      elsif md5_hash != (select ggircs_portal_private.current_form_results_md5(application_revision.application_id, application_revision.version_number)) then
        return false;
      end if;

      return true;
    end;
    $function$ language 'plpgsql' stable;

grant execute on function ggircs_portal.application_revision_certification_signature_is_valid to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_certification_signature_is_valid is 'Computed column for graphql to traverse to show if a signature is valid from application_revision';

commit;
