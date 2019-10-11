-- deploy ggircs-portal:function_import_from_swrs to pg
-- requires: schema_ggircs_portal

begin;

  create type ggircs_portal.operator_contact_data as (
      report_id integer ,
      swrs_report_id integer ,
      swrs_organisation_id integer ,
      reporting_year varchar(1000),
      first_name varchar(1000),
      last_name varchar(1000),
      position_title varchar(1000),
      contact_type varchar(1000),
      email varchar(1000),
      telephone varchar(1000),
      fax varchar(1000),
      contact_mailing_address varchar(1000),
      contact_city varchar(1000),
      contact_province varchar(1000),
      contact_postal_code varchar(1000),
      contact_country varchar(1000)
  );

  create or replace function ggircs_portal.get_swrs_operator_contact_data(
    facility_id integer ,
    reporting_year varchar(1000)
  )
  returns setof ggircs_portal.operator_contact_data
  as
  $body$
    begin
      if exists (
        select 1
        from   information_schema.tables
        where  table_schema = 'swrs'
        and    table_name = 'contact'
      )
      then
      return query (
        with selected_report as (
          select * from swrs.report where swrs_facility_id = '1766'
          and reporting_period_duration = '2018'
        )
        select
          _rep.id as report_id,
          _rep.swrs_report_id as swrs_report_id,
          _rep.swrs_organisation_id as swrs_organisation_id,
          _rep.reporting_period_duration as reporting_year,
          _contact.given_name as first_name,
          _contact.family_name as last_name,
          _contact.position as position_title,
          _contact.contact_type as contact_type,
          _contact.email_address as  email,
          _contact.telephone_number as telephone,
          _contact.fax_number as fax,
          cast('unit '  || ' ' || _contact_add.mailing_address_unit_number
                   || ', ' || _contact_add.mailing_address_street_number
                   || ' ' || _contact_add.mailing_address_street_name
                   || ' ' || _contact_add.mailing_address_street_type
                   || ' ' || _contact_add.mailing_address_street_direction as varchar(1000))
                   as contact_mailing_address,
           _contact_add.mailing_address_municipality as contact_city,
           _contact_add.mailing_address_prov_terr_state as contact_province,
           _contact_add.mailing_address_postal_code_zip_code as contact_postal_code,
           _contact_add.mailing_address_country as contact_country
          from selected_report as _rep
         inner join swrs.contact as _contact on _rep.id = _contact.report_id
         and _contact.contact_type = 'Operator Representative'
         and _contact.path_context = 'RegistrationData'
         left outer join swrs.address as _contact_add on _rep.id = _contact_add.report_id
                                            and _contact_add.type = 'Contact'
                                            and _contact_add.path_context = 'RegistrationData'
                                            limit 1
        );
      end if;
    end;
  $body$
  language 'plpgsql' stable;

commit;

-- Todo: Fix swrs addresses table to remove this limit 1 hack
--select ggircs_portal.get_swrs_operator_contact_data(1766, '2018')
