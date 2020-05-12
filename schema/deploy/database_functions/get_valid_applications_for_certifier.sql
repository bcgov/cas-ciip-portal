-- Deploy ggircs-portal:database_functions/get_valid_applications_for_certifier to pg
-- requires: tables/certification_url

begin;

  create or replace function ggircs_portal_private.get_valid_applications_for_certifier()
  returns setof integer as
  $fn$
    select a.id from ggircs_portal.application a
      join ggircs_portal.certification_url cer
        on a.id = cer.application_id
      join ggircs_portal.ciip_user cu
        on cer.certifier_email = cu.email_address
        and cu.uuid = (select sub from ggircs_portal.session());
  $fn$ language sql strict stable;

  grant execute on function ggircs_portal_private.get_valid_applications_for_certifier to ciip_administrator, ciip_analyst, ciip_industry_user;

  comment on function ggircs_portal_private.get_valid_applications_for_certifier() is 'Function returns a list of application ids that shouuld be available to a certifer via row-level security';

commit;
