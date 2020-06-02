-- Deploy ggircs-portal:policies/facility_policies to pg
-- requires: tables/certification_url

begin;

create or replace function ggircs_portal_private.get_valid_facility_organisation()
returns setof integer as
$fn$
  select o.id from ggircs_portal.organisation o
    join ggircs_portal.ciip_user_organisation cuo
      on o.id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable;

grant execute on function ggircs_portal_private.get_valid_facility_organisation to ciip_administrator, ciip_analyst, ciip_industry_user;

create or replace function ggircs_portal_private.get_valid_facility_for_certifier()
returns setof integer as
$fn$
  select facility_id from ggircs_portal.application a
    join ggircs_portal.certification_url cer
      on a.id = cer.application_id
    join ggircs_portal.ciip_user cu
      on cu.email_address = cer.certifier_email
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable security definer;
/** This function is set as security definer due to a circular access control issue with get_valid_application_facilities()
    in application_policies.sql. This is because we have both certifier and reporter using one database role as we have no
    way to differentiate between them at this time.
**/
grant execute on function ggircs_portal_private.get_valid_facility_for_certifier to ciip_administrator, ciip_analyst, ciip_industry_user;

do
  $policy$
  declare industry_user_statement text;
  declare certifier_user_statement text;
    begin
      -- ciip_administrator RLS
      perform ggircs_portal_private.upsert_policy('ciip_administrator_select_facility', 'facility', 'select', 'ciip_administrator', 'true');
      perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_facility', 'facility', 'insert', 'ciip_administrator', 'true');
      perform ggircs_portal_private.upsert_policy('ciip_administrator_update_facility', 'facility', 'update', 'ciip_administrator', 'true');

      -- ciip_analyst RLS
      perform ggircs_portal_private.upsert_policy('ciip_analyst_select_facility', 'facility', 'select', 'ciip_analyst', 'true');
      perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_facility', 'facility', 'insert', 'ciip_analyst', 'true');
      perform ggircs_portal_private.upsert_policy('ciip_analyst_update_facility', 'facility', 'update', 'ciip_analyst', 'true');

      -- statement for select using & insert with check
      industry_user_statement := 'organisation_id in (select ggircs_portal_private.get_valid_facility_organisation())';
      certifier_user_statement := 'id in (select ggircs_portal_private.get_valid_facility_for_certifier())';

      -- ciip_industry_user RLS
      perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_facility', 'facility', 'select', 'ciip_industry_user', industry_user_statement);
      perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_facility', 'facility', 'insert', 'ciip_industry_user', industry_user_statement);

      -- ciip_industry_user (certifier) RLS
      perform ggircs_portal_private.upsert_policy('certifier_select_facility', 'facility', 'select', 'ciip_industry_user', certifier_user_statement);

    end
  $policy$;

commit;
