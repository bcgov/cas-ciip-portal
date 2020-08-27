-- Deploy ggircs-portal:policies/application_policies to pg
-- requires: tables/certification_url

begin;

create or replace function ggircs_portal_private.get_valid_application_facilities()
returns setof integer as
$fn$
  select f.id from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable;

grant execute on function ggircs_portal_private.get_valid_application_facilities to ciip_administrator, ciip_analyst, ciip_industry_user;

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
declare industry_user_statement text;
declare certifier_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_application', 'application', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_application', 'application', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_application', 'application', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_application', 'application', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_application', 'application', 'update', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'facility_id in (select ggircs_portal_private.get_valid_application_facilities())';
certifier_user_statement := 'id in (select ggircs_portal_private.validate_certifier())';

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_application', 'application', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_application', 'application', 'insert', 'ciip_industry_user', industry_user_statement);

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_application', 'application', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

commit;
