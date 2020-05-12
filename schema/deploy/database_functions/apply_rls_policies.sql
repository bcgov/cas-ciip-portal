-- Deploy ggircs-portal:database_functions/apply_rls_policies to pg
-- requires: tables/form_result_status

-- apply_rls_policies is a batch alter for tables that applies the row-level security policies for each table

begin;

-- *** APPLICATION REVISION RLS POLICIES ***

create or replace function ggircs_portal_private.get_valid_applications_for_reporter()
returns setof integer as
$fn$
  select a.id from ggircs_portal.application a
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable;

grant execute on function ggircs_portal_private.get_valid_applications_for_reporter to ciip_administrator, ciip_analyst, ciip_industry_user;

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

do
$policy$
declare industry_user_statement text;
declare certifier_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_application_revision_status', 'application_revision_status', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_application_revision_status', 'application_revision_status', 'insert', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_application_revision_status', 'application_revision_status', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_application_revision_status', 'application_revision_status', 'insert', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_reporter())';
certifier_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_certifier())';

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_application_revision_status', 'application_revision_status', 'select', 'ciip_industry_user', industry_user_statement || ' or ' || certifier_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_application_revision_status', 'application_revision_status', 'insert', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;
