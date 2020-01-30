-- Deploy ggircs-portal:set_general_permissions to pg
-- requires: schema_ggircs_portal

begin;

  grant usage on schema ggircs_portal to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  -- TODO: Why is this needed?
  -- Breaks without these 2 lines. To reproduce:
  -- Remove these two lines, log in as a reporter, get access to an organisaion, click 'view facilities button'
  grant usage on schema swrs to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant select on all tables in schema swrs to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  -- TODO: Audit which functions should be executable by whom
  grant execute on all functions in schema ggircs_portal to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;


  -- These table grants should be removed when row-level security is implemented for each table.

  grant all on table ggircs_portal.application_revision_status to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.application_revision to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.application to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.benchmark to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.certification_url to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_application_wizard to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.emission_category_gas to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.facility to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.form_json to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.form_result_status to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.form_result to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.fuel to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.gas to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.organisation to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.product_form to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.product to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.review_comment to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

  grant all on table ggircs_portal.ciip_incentive_payment to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_electricity_and_heat to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_emission to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_fuel to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_production to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant all on table ggircs_portal.ciip_carbon_tax_calculation to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
