-- Deploy ggircs-portal:views/ciip_admin to pg
-- requires: tables/form_result

begin;
  create or replace view ggircs_portal.ciip_admin as (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
        (form_result.form_result ->> 'facility')::json as facility_data,
        (form_result.form_result ->> 'operator')::json as operator_data,
        (form_result.form_result ->> 'operationalRepresentative')::json as operational_representative_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'admin'
    )
    select
       x.application_id,
       x.version_number,
       (x.facility_data ->> 'bcghgid')::varchar(1000) as bcghgid,
       (x.facility_data ->> 'facilityName')::varchar(1000) as facility_name,
       (x.facility_data ->> 'facilityType')::varchar(1000) as facility_type,
       (x.operator_data ->> 'name')::varchar(1000) as operator_name,
       (x.operator_data ->> 'naics')::varchar(1000) as naics,
       (x.operator_data ->> 'tradeName')::varchar(1000) as operator_trade_name,
       (x.operator_data ->> 'bcCorporateRegistryNumber')::varchar(1000) as bc_corporate_registry_number,
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
       ((x.operational_representative_data ->> 'mailingAddress')::json ->> 'streetAddress')::varchar(1000) as operational_representative_street_address
    from x
 );

grant select on table ggircs_portal.ciip_admin to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_admin is E'@omit\n The view for admin data reported in the application';

commit;
