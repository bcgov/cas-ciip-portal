-- Deploy ggircs-portal:policies/form_result_status_policies to pg
-- requires: tables/form_result_status

begin;

create or replace function ggircs_portal_private.get_valid_form_result_status_applications()
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

grant execute on function ggircs_portal_private.get_valid_form_result_status_applications to ciip_administrator, ciip_analyst, ciip_industry_user;

do
$policy$
declare industry_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_form_result_status', 'form_result_status', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_form_result_status', 'form_result_status', 'insert', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_form_result_status', 'form_result_status', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_form_result_status', 'form_result_status', 'insert', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'application_id in (select ggircs_portal_private.get_valid_form_result_status_applications())' ;

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_form_result_status', 'form_result_status', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_form_result_status', 'form_result_status', 'insert', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;
