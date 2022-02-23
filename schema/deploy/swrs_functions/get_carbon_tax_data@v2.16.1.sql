-- Deploy ggircs-portal:function_get_carbon_tax_data to pg
-- requires: schema_ggircs_portal

begin;

  alter type ggircs_portal.carbon_tax_data alter attribute unit_conversion_factor type numeric;

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

commit;
