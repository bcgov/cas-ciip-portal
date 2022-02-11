-- deploy ggircs-portal:function_import_from_swrs to pg
-- requires: schema_ggircs_portal

begin;

  create or replace function ggircs_portal.get_swrs_facility_data(
    facility_id integer ,
    reporting_year integer
  )
  returns ggircs_portal.facility_data
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
      return (
        with selected_report as (
          select * from swrs.report where swrs_facility_id = facility_id
          and reporting_period_duration = reporting_year
        )
        select row(
          _rep.id,
          _rep.swrs_report_id,
          _rep.swrs_facility_id ,
          _rep.swrs_organisation_id ,
          _rep.reporting_period_duration,
          _fac.facility_name,
          _fac.facility_type,
          _identifier.identifier_value,
          _naics.naics_code::varchar(1000),
          _naics.naics_classification,
          _fac.latitude,
          _fac.longitude,

          cast(
            concat(
              'unit ' || _fac_add.mailing_address_unit_number || ', ',
              _fac_add.mailing_address_street_number || ' ',
              _fac_add.mailing_address_street_number_suffix || ' ',
              _fac_add.mailing_address_street_name || ' ',
              _fac_add.mailing_address_street_type || ' ',
              _fac_add.mailing_address_street_direction
            )
          as varchar(1000)),
           _fac_add.mailing_address_municipality,
           _fac_add.mailing_address_prov_terr_state,
           _fac_add.mailing_address_postal_code_zip_code,
           _fac_add.mailing_address_country
        )
        from selected_report as _rep
      --  inner join swrs.facility_details as _fac
      --   on _rep.id = _fac.report_id
        join swrs.facility _fac
          on _rep.id = _fac.report_id
        left join swrs.naics _naics
          on _rep.id = _naics.report_id
          and _naics.naics_priority = 'Primary'
        left join swrs.identifier as _identifier
          on _fac.id = _identifier.facility_bcghgid_id
        left outer join swrs.address as _fac_add on _rep.id = _fac_add.report_id
                                            and _fac_add.type = 'Facility'
                                            and _fac_add.path_context = 'RegistrationData'
                                            limit 1

      );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.get_swrs_facility_data to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
