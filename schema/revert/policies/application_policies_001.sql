-- Revert ggircs-portal:policies/application_policies_001 from pg

BEGIN;

create or replace function ggircs_portal_private.validate_certifier()
  returns setof integer as
  $fn$
    select application_id from ggircs_portal.certification_url cer
      join ggircs_portal.ciip_user cu
        on lower(cer.certifier_email) = lower(cu.email_address)
        and cu.uuid = (select sub from ggircs_portal.session());
  $fn$ language sql strict stable;

  grant execute on function ggircs_portal_private.validate_certifier to ciip_administrator, ciip_analyst, ciip_industry_user;

do
$policy$
declare certifier_user_statement text;
begin

certifier_user_statement := 'id in (select ggircs_portal_private.validate_certifier())';

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_application', 'application', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

COMMIT;
