-- Revert ggircs-portal:policies/facility_policies_001 from pg

BEGIN;

create or replace function ggircs_portal_private.get_valid_facility_for_certifier()
returns setof integer as
$fn$
  select facility_id from ggircs_portal.application a
    join ggircs_portal.certification_url cer
      on a.id = cer.application_id
    join ggircs_portal.ciip_user cu
      on lower(cu.email_address) = lower(cer.certifier_email)
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable security definer;
/** This function is set as security definer due to a circular access control issue with get_valid_application_facilities()
    in application_policies.sql. This is because we have both certifier and reporter using one database role as we have no
    way to differentiate between them at this time.
**/
grant execute on function ggircs_portal_private.get_valid_facility_for_certifier to ciip_administrator, ciip_analyst, ciip_industry_user;

do
  $policy$
  declare certifier_user_statement text;
    begin

      certifier_user_statement := 'id in (select ggircs_portal_private.get_valid_facility_for_certifier())';

      -- ciip_industry_user (certifier) RLS
      perform ggircs_portal_private.upsert_policy('certifier_select_facility', 'facility', 'select', 'ciip_industry_user', certifier_user_statement);

    end
  $policy$;

COMMIT;
