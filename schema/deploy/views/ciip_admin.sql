-- Deploy ggircs-portal:views/ciip_admin to pg
-- requires: tables/form_result

begin;
  drop view ggircs_portal.ciip_admin;
  create or replace view ggircs_portal.ciip_admin as (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
        (form_result.form_result ->> 'facility')::json as facility_data,
        (form_result.form_result ->> 'operator')::json as operator_data,
        (form_result.form_result ->> 'operationalRepresentative')::json as operational_representative_data,
        (form_result.form_result ->> 'certifyingOfficial')::json as certifying_official_data,
        (form_result.form_result ->> 'applicationMetadata')::json as application_metadata
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug in ('admin', 'admin-2018')
    )
    select
       x.application_id,
       x.version_number,
       (select reporting_year from ggircs_portal.application where id = application_id) as reporting_year,
       (x.facility_data ->> 'bcghgid')::varchar(1000) as bcghgid,
       (x.facility_data ->> 'facilityName')::varchar(1000) as facility_name,
       (x.facility_data ->> 'facilityType')::varchar(1000) as facility_type,
       (x.facility_data ->> 'facilityDescription')::varchar(1000) as facility_description,
       (x.operator_data ->> 'name')::varchar(1000) as operator_name,
       (x.operator_data ->> 'naics')::varchar(1000) as naics,
       (x.operator_data ->> 'tradeName')::varchar(1000) as operator_trade_name,
       (x.operator_data ->> 'bcCorporateRegistryNumber')::varchar(1000) as bc_corporate_registry_number,
       (x.operator_data ->> 'isBcCorpRegNumberValid')::varchar(1000) as is_bc_corporate_registry_number_valid,
       (x.operator_data ->> 'orgBookLegalName')::varchar(1000) as org_book_legal_name,
       (x.operator_data ->> 'duns')::varchar(1000) as duns,
       ((x.operator_data ->> 'mailingAddress')::json ->> 'city')::varchar(1000) as operator_city,
       ((x.operator_data ->> 'mailingAddress')::json ->> 'province')::varchar(1000) as operator_province,
       ((x.operator_data ->> 'mailingAddress')::json ->> 'postalCode')::varchar(1000) as operator_postal_code,
       ((x.operator_data ->> 'mailingAddress')::json ->> 'streetAddress')::varchar(1000) as operator_street_address,
       (x.operational_representative_data ->> 'email')::varchar(1000) as operational_representative_email,
       (x.operational_representative_data ->> 'phone')::varchar(1000) as operational_representative_phone,
       (x.operational_representative_data ->> 'lastName')::varchar(1000) as operational_representative_last_name,
       (x.operational_representative_data ->> 'firstName')::varchar(1000) as operational_representative_first_name,
       (x.operational_representative_data ->> 'position')::varchar(1000) as operational_representative_position,
       ((x.operational_representative_data ->> 'mailingAddress')::json ->> 'city')::varchar(1000) as operational_representative_city,
       ((x.operational_representative_data ->> 'mailingAddress')::json ->> 'province')::varchar(1000) as operational_representative_province,
       ((x.operational_representative_data ->> 'mailingAddress')::json ->> 'postalCode')::varchar(1000) as operational_representative_postal_code,
       ((x.operational_representative_data ->> 'mailingAddress')::json ->> 'streetAddress')::varchar(1000) as operational_representative_street_address,
       (x.certifying_official_data ->> 'email')::varchar(1000) as certifying_official_email,
       (x.certifying_official_data ->> 'phone')::varchar(1000) as certifying_official_phone,
       (x.certifying_official_data ->> 'lastName')::varchar(1000) as certifying_official_last_name,
       (x.certifying_official_data ->> 'firstName')::varchar(1000) as certifying_official_first_name,
       (x.certifying_official_data ->> 'position')::varchar(1000) as certifying_official_position,
       ((x.certifying_official_data ->> 'mailingAddress')::json ->> 'city')::varchar(1000) as certifying_official_city,
       ((x.certifying_official_data ->> 'mailingAddress')::json ->> 'province')::varchar(1000) as certifying_official_province,
       ((x.certifying_official_data ->> 'mailingAddress')::json ->> 'postalCode')::varchar(1000) as certifying_official_postal_code,
       ((x.certifying_official_data ->> 'mailingAddress')::json ->> 'streetAddress')::varchar(1000) as certifying_official_street_address,
       (x.application_metadata ->> 'sourceFileName')::varchar(1000) as application_source_filename,
       (x.application_metadata ->> 'sourceSHA1')::varchar(1000) as application_source_sha1,
       (x.application_metadata ->> 'importedAt')::timestamptz as application_imported_at,
       (x.application_metadata ->> 'applicationType')::varchar(1000) as application_type,
       (x.application_metadata ->> 'applicationSignatureDate')::timestamptz as application_signature_date
    from x
 );

grant select on table ggircs_portal.ciip_admin to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_admin is E'@omit\n The view for admin data reported in the application';
comment on column ggircs_portal.ciip_admin.application_id is 'The application id';
comment on column ggircs_portal.ciip_admin.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_admin.reporting_year is 'The reporting year this data was submitted for';
comment on column ggircs_portal.ciip_admin.bcghgid is 'The facility bcghgid';
comment on column ggircs_portal.ciip_admin.facility_name is 'The name of the facility';
comment on column ggircs_portal.ciip_admin.facility_type is 'The type of the facility';
comment on column ggircs_portal.ciip_admin.facility_description is 'A description of the facility';
comment on column ggircs_portal.ciip_admin.operator_name is 'The name of the operator';
comment on column ggircs_portal.ciip_admin.naics is 'The operators naics code';
comment on column ggircs_portal.ciip_admin.operator_trade_name is 'The operators trade name';
comment on column ggircs_portal.ciip_admin.bc_corporate_registry_number is 'The operators bc corporate registry number';
comment on column ggircs_portal.ciip_admin.is_bc_corporate_registry_number_valid is 'Boolean value indicates if the bc corporate registry number is a valid bc corp reg number';
comment on column ggircs_portal.ciip_admin.org_book_legal_name is 'The legal name according to BCGov orgbook';
comment on column ggircs_portal.ciip_admin.duns is 'The duns number attributed to this organisation';
comment on column ggircs_portal.ciip_admin.operator_city is 'The operators city';
comment on column ggircs_portal.ciip_admin.operator_province is 'The operators province';
comment on column ggircs_portal.ciip_admin.operator_postal_code is 'The operators postal code';
comment on column ggircs_portal.ciip_admin.operator_street_address is 'The operators street address';
comment on column ggircs_portal.ciip_admin.operational_representative_email is 'The operational representatives email address';
comment on column ggircs_portal.ciip_admin.operational_representative_phone is 'The operational representatives phone number';
comment on column ggircs_portal.ciip_admin.operational_representative_last_name is 'The operational representatives last name';
comment on column ggircs_portal.ciip_admin.operational_representative_first_name is 'The operational representatives first name';
comment on column ggircs_portal.ciip_admin.operational_representative_position is 'The operational representatives position';
comment on column ggircs_portal.ciip_admin.operational_representative_city is 'The operational representatives city';
comment on column ggircs_portal.ciip_admin.operational_representative_province is 'The operational representatives province';
comment on column ggircs_portal.ciip_admin.operational_representative_postal_code is 'The operational representatives postal code';
comment on column ggircs_portal.ciip_admin.operational_representative_street_address is 'The operational representatives street address';
comment on column ggircs_portal.ciip_admin.operational_representative_email is 'The certifying officials email address';
comment on column ggircs_portal.ciip_admin.certifying_official_phone is 'The certifying officials phone number';
comment on column ggircs_portal.ciip_admin.certifying_official_last_name is 'The certifying officials last name';
comment on column ggircs_portal.ciip_admin.certifying_official_first_name is 'The certifying officials first name';
comment on column ggircs_portal.ciip_admin.certifying_official_position is 'The certifying officials position';
comment on column ggircs_portal.ciip_admin.certifying_official_city is 'The certifying officials city';
comment on column ggircs_portal.ciip_admin.certifying_official_province is 'The certifying officials province';
comment on column ggircs_portal.ciip_admin.certifying_official_postal_code is 'The certifying officials postal code';
comment on column ggircs_portal.ciip_admin.certifying_official_street_address is 'The certifying officials street address';
comment on column ggircs_portal.ciip_admin.application_source_filename is 'The name of the file this application was parsed from';
comment on column ggircs_portal.ciip_admin.application_source_sha1 is 'The sha1 of this (2018) application';
comment on column ggircs_portal.ciip_admin.application_imported_at is 'The date this application was imported from swrs';
comment on column ggircs_portal.ciip_admin.application_type is 'The type of the application (found in 2018 data only, application_type = facility_type)';
comment on column ggircs_portal.ciip_admin.application_signature_date is 'The date this application was signed off on';


commit;
