-- Deploy ggircs-portal:function_get_carbon_tax_data to pg
-- requires: schema_ggircs_portal


-- deploy ggircs-portal:function_import_from_swrs to pg
-- requires: schema_ggircs_portal

begin;

  create type ggircs_portal.carbon_tax_data as (
      fuel_mapping_id int,
      carbon_taxed boolean,
      cta_rate_units varchar(1000),
      unit_conversion_factor int,
      fuel_charge numeric,
      rate_start_date date,
      rate_end_date date
  );

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
      )
      then
      raise notice 'boop';
      return query (
        select fm.id as fuel_mapping_id,
               ctd.carbon_taxed, ctd.cta_rate_units, ctd.unit_conversion_factor,
               fc.fuel_charge, fc.start_date as rate_state_date, fc.end_date as rate_end_date
        from swrs.fuel_mapping as fm
          join swrs.fuel_carbon_tax_details as ctd
          on fm.fuel_carbon_tax_details_id = ctd.id
          join swrs.fuel_charge as fc
          on fc.fuel_mapping_id = fm.id
      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

commit;
