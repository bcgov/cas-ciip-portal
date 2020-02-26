-- Deploy ggircs-portal:computed_columns/application_revision_certification_url to pg
-- requires: tables/certification_url

begin;

  create or replace function ggircs_portal.application_revision_certification_url(
    application_revision ggircs_portal.application_revision
  )
    returns ggircs_portal.certification_url
    as
    $function$
    declare
    result ggircs_portal.certification_url;
    begin
        with last_created as (
          select max(created_at) as created_at
          from ggircs_portal.certification_url
          where certification_url.application_id = application_revision.application_id
          and certification_url.version_number = application_revision.version_number)
        select * from ggircs_portal.certification_url
          where certification_url.application_id = application_revision.application_id
          and certification_url.version_number = application_revision.version_number
          and certification_url.created_at = (select created_at from last_created) into result;
      return result;
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.application_revision_certification_url to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
