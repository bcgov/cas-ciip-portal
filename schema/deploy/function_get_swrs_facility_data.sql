-- deploy ggircs-portal:function_import_from_swrs to pg
-- requires: schema_ggircs_portal

begin;

  create type ggircs_portal.facility_data as (
      report_id integer ,
      swrs_report_id integer ,
      swrs_facility_id integer ,
      swrs_organisation_id integer ,
      reporting_year varchar(1000),
      facility_name varchar(1000),
      facility_type varchar(1000),
      bcghgid varchar(1000),
      naics_code integer,
      naics_classification varchar(1000),
      latitude numeric,
      longitude numeric,
      facility_mailing_address varchar(1000),
      facility_city varchar(1000),
      facility_province varchar(1000),
      facility_postal_code varchar(1000),
      facility_country varchar(1000)
  );

  create or replace function ggircs_portal.get_swrs_facility_data(
    facility_id integer ,
    reporting_year varchar(1000)
  )
  returns setof ggircs_portal.facility_data
  as
  $body$
    begin
      if exists (
        select 1
        from   information_schema.views
        where  table_schema = 'swrs'
        and    table_name = 'facility_details'
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
          _rep.swrs_facility_id as swrs_facility_id,
          _rep.swrs_organisation_id as swrs_organisation_id,
          _rep.reporting_period_duration as reporting_year,
          _fac.facility_name as facility_name,
          _fac.facility_type as facility_type,
          _fac.identifier_value as bcghgid,
          _fac.naics_code as naics_code,
          _fac.naics_classification as naics_classification,
          _fac.latitude as latitude,
          _fac.longitude as longitude,

          cast('unit '  || ', ' || _fac_add.mailing_address_unit_number
                   || ', ' || _fac_add.mailing_address_street_number
                   || ' ' || _fac_add.mailing_address_street_name
                   || ' ' || _fac_add.mailing_address_street_type
                   || ' ' || _fac_add.mailing_address_street_direction as varchar(1000))
                   as facility_mailing_address,
           _fac_add.mailing_address_municipality as facility_city,
           _fac_add.mailing_address_prov_terr_state as facility_province,
           _fac_add.mailing_address_postal_code_zip_code as facility_postal_code,
           _fac_add.mailing_address_country as facility_country
         from selected_report as _rep
         inner join swrs.facility_details as _fac on _rep.id = _fac.report_id
         left outer join swrs.address as _fac_add on _rep.id = _fac_add.report_id
                                            and _fac_add.type = 'Facility'
                                            and _fac_add.path_context = 'RegistrationData'

      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

commit;
