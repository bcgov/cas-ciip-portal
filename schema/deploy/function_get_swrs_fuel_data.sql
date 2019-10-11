-- Deploy ggircs-portal:function_get_swrs_fuel_data to pg

begin;

  create type ggircs_portal.fuel_data as (
    report_id integer,
    fuel_type varchar(1000),
    fuel_classification varchar(1000),
    fuel_description varchar(1000),
    fuel_units varchar(1000),
    annual_fuel_amount numeric,
    annual_weighted_avg_hhv numeric,
    annual_weighted_avg_carbon_content numeric,
    alternative_methodolody_description varchar(10000)
  );


  create or replace function ggircs_portal.get_swrs_fuel_data(
    facility_id integer ,
    reporting_year varchar(1000)
  )
  returns setof ggircs_portal.fuel_data
  as
  $body$
    begin
      if exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'fuel'
      )
      then
      return query (
         with selected_report as (
            select * from swrs.report where swrs_facility_id = facility_id
            and reporting_period_duration = reporting_year
          )
          select
            report_id,
            fuel_type,
            fuel_classification,
            fuel_description,
            fuel_units ,
            annual_fuel_amount,
            annual_weighted_avg_hhv,
            annual_weighted_avg_carbon_content,
            alternative_methodology_description
          from swrs.fuel as _fuel
          inner join selected_report as _rep on _fuel.report_id = _rep.id
          where _fuel.fuel_type is not null
      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

commit;


