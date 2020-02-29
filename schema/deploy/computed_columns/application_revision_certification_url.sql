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
        select * from ggircs_portal.certification_url
          where certification_url.application_id = application_revision.application_id
          and certification_url.version_number = application_revision.version_number
          order by certification_url.created_at desc limit 1 into result;
      return result;
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.application_revision_certification_url to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_certification_url is 'Computed column for graphql to traverse to a certification_url row from application_revision';

commit;
