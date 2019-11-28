-- Deploy ggircs-portal:view_ciip_carbon_tax_calculation to pg
-- requires: function_get_carbon_tax_data
-- requires: view_ciip_fuel
-- requires: table_application

begin;

  create view ggircs_portal.ciip_carbon_tax_calculation as (
    with ct_details as (select  * from ggircs_portal.get_carbon_tax_data())
    select
      a.id as application_id,
      a.reporting_year,
      cf.fuel_type,
      f.units,
      quantity,
      ct_details.*,
      round((cf.quantity * ct_details.unit_conversion_factor * ct_details.fuel_charge), 2) as calculated_carbon_tax
    from ggircs_portal.ciip_fuel as cf
    join ggircs_portal.fuel as f
      on cf.fuel_type = f.name
    join ggircs_portal.application as a
      on cf.id = a.id
    join ct_details
      on f.swrs_fuel_mapping_id = ct_details.fuel_mapping_id
      and concat((a.reporting_year - 1):: text, '-12-31')::date between ct_details.rate_start_date and ct_details.rate_end_date
 );

comment on view ggircs_portal.ciip_carbon_tax_calculation is 'The view for calculating carbon tax based on ciip data';

commit;
