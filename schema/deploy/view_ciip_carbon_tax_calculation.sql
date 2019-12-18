-- Deploy ggircs-portal:view_ciip_carbon_tax_calculation to pg
-- requires: function_get_carbon_tax_data
-- requires: view_ciip_fuel
-- requires: table_application

begin;

  create view ggircs_portal.ciip_carbon_tax_calculation as (
    with ct_details as (select  * from ggircs_portal.get_carbon_tax_data())
    select
      cf.application_id,
      cf.version_number,
      a.reporting_year,
      cf.fuel_type,
      f.units,
      quantity,
      ct_details.carbon_tax_rate,
      ct_details.fuel_charge,
      ct_details.cta_rate_units,
      ct_details.fuel_mapping_id,
      ct_details.unit_conversion_factor,
      ct_details.carbon_taxed,
      round((cf.quantity * ct_details.unit_conversion_factor * ct_details.fuel_charge), 2) as calculated_carbon_tax,
      round(
        ((cf.quantity * ct_details.unit_conversion_factor * ct_details.fuel_charge) / ct_details.carbon_tax_rate)
        * (ct_details.carbon_tax_rate - 30), 2) as carbon_tax_applicable_to_ciip
    from ggircs_portal.ciip_fuel as cf
    join ggircs_portal.fuel as f
      on cf.fuel_type = f.name
    join ggircs_portal.application as a
      on cf.application_id = a.id
    join ct_details
      on f.swrs_fuel_mapping_id = ct_details.fuel_mapping_id
      and concat((a.reporting_year - 1):: text, '-12-31')::date between ct_details.rate_start_date and ct_details.rate_end_date
 );

comment on view ggircs_portal.ciip_carbon_tax_calculation is 'The view for calculating carbon tax based on ciip data';
comment on column ggircs_portal.ciip_carbon_tax_calculation.application_id is 'The application id';
comment on column ggircs_portal.ciip_carbon_tax_calculation.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_type is 'The name of the fuel this carbon tax applied to';
comment on column ggircs_portal.ciip_carbon_tax_calculation.reporting_year is 'The application''s reporting year';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_rate is 'The carbon tax rate applicable to the reporting year';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_mapping_id is 'The SWRS fuel mapping id for the fuel';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_charge is 'The amount charged for the fuel';
comment on column ggircs_portal.ciip_carbon_tax_calculation.cta_rate_units is 'The units for the fuel charge';
comment on column ggircs_portal.ciip_carbon_tax_calculation.quantity is 'The quantity of fuel consumed in the reporting period';
comment on column ggircs_portal.ciip_carbon_tax_calculation.units is 'The fuel quantity units';
comment on column ggircs_portal.ciip_carbon_tax_calculation.unit_conversion_factor is 'The conversion factor applied to the fuel quantity';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_taxed is 'Whether this fuel has a tax';
comment on column ggircs_portal.ciip_carbon_tax_calculation.calculated_carbon_tax is 'The carbon tax applicable to this fuel (assuming a flat carbon tax rate for the reporting year)';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_applicable_to_ciip is 'The amount of carbon tax payed eligible for an incentive';

commit;
