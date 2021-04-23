-- Deploy ggircs-portal:function_get_carbon_tax_data to pg
-- requires: schema_ggircs_portal

begin;

  alter type ggircs_portal.carbon_tax_data drop attribute carbon_taxed cascade;

  create or replace function ggircs_portal.get_carbon_tax_data()
  returns setof ggircs_portal.carbon_tax_data
  as
  $body$
    begin
      if exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'fuel_mapping'
      ) and exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'fuel_carbon_tax_details'
      ) and exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'fuel_charge'
      ) and exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'carbon_tax_act_fuel_type'
      )
      then
      return query (
        select fm.id as fuel_mapping_id,
               ctd.cta_rate_units, ctd.unit_conversion_factor,
               fc.fuel_charge, fc.start_date as rate_state_date, fc.end_date as rate_end_date,
               carbon_tax_rate_mapping.carbon_tax_rate
        from swrs.fuel_mapping as fm
          join swrs.fuel_carbon_tax_details as ctd
          on fm.fuel_carbon_tax_details_id = ctd.id
          join swrs.carbon_tax_act_fuel_type as cta
          on ctd.carbon_tax_act_fuel_type_id = cta.id
          join swrs.fuel_charge as fc
          on fc.carbon_tax_act_fuel_type_id = cta.id
          join swrs.carbon_tax_rate_mapping on fc.start_date = carbon_tax_rate_mapping.rate_start_date
      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.get_carbon_tax_data to ciip_administrator, ciip_analyst, ciip_industry_user;

  /**
    Altering the carbon_tax_data type in this migration after this view was re-defined in the previous migration causes
    an error as object names are resolved during CREATE VIEW, so the current setting of search_path applies.
    This means the view thinks the return type of get_carbon_tax_data() should still include the dropped attribute.
    (error: attribute 2 of type record has been dropped).
    Doing another identical "create or replace view..." at the end of this migration resets the definition to properly accept the
    new return shape of get_carbon_tax_data().
  **/
  create or replace view ggircs_portal.ciip_carbon_tax_calculation as (
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
        ct_details_end.carbon_tax_rate as carbon_tax_rate_end,
        ct_details_end.fuel_charge as fuel_charge_end,
        ct_details_end.cta_rate_units as cta_rate_units_end,
        ct_details_end.fuel_mapping_id as fuel_mapping_id_end,
        ct_details_end.unit_conversion_factor as unit_conversion_factor_end,
        date_part('day', ct_details_start.rate_end_date - reporting_year.reporting_period_start) as start_rate_days,
        date_part('day', reporting_year.reporting_period_end - ct_details_end.rate_start_date) as end_rate_days
      from ggircs_portal.ciip_fuel as cf
        inner join ggircs_portal.emission_category ec
          on cf.emission_category_id = ec. id
          and ec.swrs_emission_category is not null
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

commit;
