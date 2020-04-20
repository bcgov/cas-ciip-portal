-- Deploy ggircs-portal:view_ciip_carbon_tax_calculation to pg
-- requires: function_get_carbon_tax_data
-- requires: view_ciip_fuel
-- requires: table_application

begin;

  create view ggircs_portal.ciip_carbon_tax_calculation as (
    with ct_details as (select  * from ggircs_portal.get_carbon_tax_data()),
    carbon_tax_variables as (
      select
        cf.application_id,
        cf.version_number,
        reporting_year.reporting_year,
        date_part('day', reporting_year.reporting_period_end - reporting_year.reporting_period_start) as reporting_period_days,
        f.name as fuel_type,
        f.units,
        quantity,
        (cf.quantity * ct_details_start.unit_conversion_factor * ct_details_start.fuel_charge) as fuel_tax_start_rate,
        (cf.quantity * ct_details_end.unit_conversion_factor * ct_details_end.fuel_charge) as fuel_tax_end_rate,
        ct_details_start.carbon_tax_rate as carbon_tax_rate_start,
        ct_details_start.fuel_charge as fuel_charge_start,
        ct_details_start.cta_rate_units as cta_rate_units_start,
        ct_details_start.fuel_mapping_id as fuel_mapping_id_start,
        ct_details_start.unit_conversion_factor as unit_conversion_factor_start,
        ct_details_start.carbon_taxed as carbon_taxed_start,
        ct_details_end.carbon_tax_rate as carbon_tax_rate_end,
        ct_details_end.fuel_charge as fuel_charge_end,
        ct_details_end.cta_rate_units as cta_rate_units_end,
        ct_details_end.fuel_mapping_id as fuel_mapping_id_end,
        ct_details_end.unit_conversion_factor as unit_conversion_factor_end,
        ct_details_end.carbon_taxed as carbon_taxed_end,
        date_part('day', ct_details_start.rate_end_date - reporting_year.reporting_period_start) as start_rate_days,
        date_part('day', reporting_year.reporting_period_end - ct_details_end.rate_start_date) as end_rate_days
      from ggircs_portal.ciip_fuel as cf
      join ggircs_portal.fuel as f
        on cf.fuel_id = f.id
      join ggircs_portal.application as a
        on cf.application_id = a.id
      join ggircs_portal.reporting_year on a.reporting_year = reporting_year.reporting_year
      join ct_details as ct_details_start -- The carbon tax data at the start of the reporting period
        on f.swrs_fuel_mapping_id = ct_details_start.fuel_mapping_id
        and reporting_year.reporting_period_start between ct_details_start.rate_start_date and ct_details_start.rate_end_date
      join ct_details as ct_details_end -- The carbon tax data at the end of the reporting period
        on f.swrs_fuel_mapping_id = ct_details_end.fuel_mapping_id
        and reporting_year.reporting_period_end between ct_details_end.rate_start_date and ct_details_end.rate_end_date
    )
    select
      application_id,
      version_number,
      fuel_type,
      quantity,
      units,
      reporting_year,
      carbon_tax_rate_start,
      carbon_tax_rate_end,
      round(fuel_tax_end_rate::numeric, 2) as carbon_tax_flat,
      round(((fuel_tax_end_rate / carbon_tax_rate_end) * (carbon_tax_rate_end - 30))::numeric, 2) as carbon_tax_eligible_for_ciip_flat,
      round(
        ((fuel_tax_start_rate * (start_rate_days / reporting_period_days) + fuel_tax_end_rate * (end_rate_days / reporting_period_days))
        * (reporting_period_days / (start_rate_days + end_rate_days)))::numeric,
        -- The last part accounts for future years where start_rate and end_rate are the same,
        -- causing the line above to count the carbon tax twice
      2) as carbon_tax_pro_rated,
      round(((
          (fuel_tax_start_rate / carbon_tax_rate_start) * (carbon_tax_rate_start - 30) * (start_rate_days / reporting_period_days) +
          (fuel_tax_end_rate / carbon_tax_rate_end) * (carbon_tax_rate_end - 30) * (end_rate_days / reporting_period_days)
        ) * (reporting_period_days / (start_rate_days + end_rate_days)))::numeric,
      2) as carbon_tax_eligible_for_ciip_pro_rated

    from carbon_tax_variables
 );

grant select on table ggircs_portal.ciip_carbon_tax_calculation to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_carbon_tax_calculation is 'The view for calculating carbon tax based on ciip data';
comment on column ggircs_portal.ciip_carbon_tax_calculation.application_id is 'The application id';
comment on column ggircs_portal.ciip_carbon_tax_calculation.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_carbon_tax_calculation.fuel_type is 'The name of the fuel this carbon tax applied to';
comment on column ggircs_portal.ciip_carbon_tax_calculation.reporting_year is 'The application''s reporting year';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_rate_start is 'The carbon tax rate applicable at the start of the reporting period';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_rate_end is 'The carbon tax rate applicable at the end of the reporting period';
comment on column ggircs_portal.ciip_carbon_tax_calculation.quantity is 'The quantity of fuel consumed in the reporting period';
comment on column ggircs_portal.ciip_carbon_tax_calculation.units is 'The fuel quantity units';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_flat is 'The carbon tax applicable to this fuel (assuming a flat carbon tax rate for the reporting year)';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_eligible_for_ciip_flat is 'The amount of carbon tax payed eligible for an incentive (assuming a flat carbon tax rate for the reporting year)';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_pro_rated is 'The carbon tax applicable to this fuel';
comment on column ggircs_portal.ciip_carbon_tax_calculation.carbon_tax_eligible_for_ciip_pro_rated is 'The amount of carbon tax payed eligible for an incentive';

commit;
