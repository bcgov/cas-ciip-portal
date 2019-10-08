-- deploy ggircs-portal:function_import_from_swrs to pg
-- requires: schema_ggircs_portal

begin;

  create type ggircs_portal.organisation_data as (
      report_id integer ,
      swrs_report_id integer ,
      swrs_organisation_id integer ,
      reporting_year varchar(1000),
      operator_name varchar(1000),
      operator_trade_name varchar(1000),
      duns varchar(1000),
      cra_business_number varchar(1000),
      operator_mailing_address varchar(1000),
      operator_city varchar(1000),
      operator_province varchar(1000),
      operator_postal_code varchar(1000),
      operator_country varchar(1000)
  );

  create or replace function ggircs_portal.get_swrs_organisation_data(
    facility_id integer ,
    reporting_year varchar(1000)
  )
  returns setof ggircs_portal.organisation_data
  as
  $body$
    begin
      if exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'organisation'
      )
      then
      return query (
        with selected_report as (
          select * from swrs.report where swrs_facility_id = facility_id
          and reporting_period_duration = reporting_year
        )
        select
          _rep.id as report_id,
          _rep.swrs_report_id as swrs_report_id,
          _org.swrs_organisation_id as swrs_organisation_id,
          _rep.reporting_period_duration as reporting_year,
          _org.business_legal_name as operator_name,
          _org.english_trade_name as operator_trade_name,
          _org.duns as duns,
          _org.cra_business_number as cra_business_number,
          cast('unit '  || ' ' || _org_add.mailing_address_unit_number
                   || ', ' || _org_add.mailing_address_street_number
                   || ' ' || _org_add.mailing_address_street_name
                   || ' ' || _org_add.mailing_address_street_type
                   || ' ' || _org_add.mailing_address_street_direction as varchar(1000))
                   as operator_mailing_address,
           _org_add.mailing_address_municipality as operator_city,
           _org_add.mailing_address_prov_terr_state as operator_province,
           _org_add.mailing_address_postal_code_zip_code as operator_postal_code,
           _org_add.mailing_address_country as operator_country
         from selected_report as _rep
         inner join swrs.organisation as _org on _rep.id = _org.report_id
         left outer join swrs.address as _org_add on _rep.id = _org_add.report_id
                                            and _org_add.type = 'Organisation'
                                            and _org_add.path_context = 'RegistrationData'

      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

commit;


--select ggircs_portal.get_swrs_organisation_data(1766, '2018')