-- Deploy ggircs-portal:view_ciip_carbon_tax_calculation to pg
-- requires: function_get_carbon_tax_data
-- requires: view_ciip_fuel
-- requires: table_application

begin;
  drop view ggircs_portal.ciip_carbon_tax_calculation;
  create or replace view ggircs_portal.ciip_carbon_tax_calculation as (
    select
      ar.application_id, ar.version_number, a.reporting_year,
      ec.display_name as emission_category,
      f.id as fuel_id, f.name as fuel_type, ct.fuel_amount, f.units as fuel_units,
      ct.carbon_tax, ct.carbon_tax_eligible_for_ciip,
      ct.reporting_year_fuel_charge, ct.pre_increase_fuel_charge
    from ggircs_portal.application_revision ar
    join lateral
    (
      select * from  ggircs_portal.application_revision_carbon_tax(row(ar.*)::ggircs_portal.application_revision)
    ) ct on true
    join ggircs_portal.fuel f on f.id = ct.fuel_id
    join ggircs_portal.application a on a.id = ar.application_id
    join ggircs_portal.emission_category ec on ec.id = emission_category_id
 );

grant select on table ggircs_portal.ciip_carbon_tax_calculation to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_carbon_tax_calculation is 'The view for calculating carbon tax based on ciip data';
comment on column ggircs_portal.ciip_carbon_tax_calculation.application_id is 'The application id';
comment on column ggircs_portal.ciip_carbon_tax_calculation.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_carbon_tax_calculation.reporting_year is 'The application''s reporting year';
comment on column ggircs_portal.ciip_carbon_tax_calculation.emission_category is 'The display name of the emission category for this fuel amount';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_id is 'The id of the fuel in the ggircs_portal.fuel table';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_type is 'The name of the fuel this carbon tax applied to';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_amount is 'The amount of fuel consumed in the reporting period';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_units is 'The unit of measurement used for that fuel';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax is 'The carbon tax applicable to this fuel (assuming a flat carbon tax rate for the reporting year)';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_eligible_for_ciip is 'The amount of carbon tax payed eligible for an incentive (assuming a flat carbon tax rate for the reporting year)';
comment on column ggircs_portal.ciip_carbon_tax_calculation.reporting_year_fuel_charge is 'The carbon tax rate applicable for this fuel at the end of the reporting period of this record''s application';
comment on column ggircs_portal.ciip_carbon_tax_calculation.pre_increase_fuel_charge is 'The carbon tax rate applicable for this fuel on March 31st, 2018. This is the fuel rate used to calculate the tax amount eligible for an incentive.';

commit;
