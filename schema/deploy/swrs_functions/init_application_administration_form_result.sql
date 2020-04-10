-- Deploy ggircs-portal:function_init_application_administration_form_result to pg

begin;

create or replace function ggircs_portal.init_application_administration_form_result(facility_id int, reporting_year integer)
returns jsonb
as $function$
declare
  swrs_facility_id int;
  org_data ggircs_portal.organisation_data;
  facility_data ggircs_portal.facility_data;
  contact_data ggircs_portal.operator_contact_data;
begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;
  select * from ggircs_portal.get_swrs_organisation_data(swrs_facility_id, reporting_year) into org_data;
  select * from ggircs_portal.get_swrs_facility_data(swrs_facility_id, reporting_year) into facility_data;
  select * from ggircs_portal.get_swrs_operator_contact_data(swrs_facility_id, reporting_year) into contact_data;

  if org_data is null then
    return '{}';
  end if;

  return jsonb_build_object(
    'operator', jsonb_build_object(
      'name', org_data.operator_name,
      'tradeName', org_data.operator_trade_name,
      'duns', org_data.duns,
      'bcCorporateRegistryNumber', '',
      'naics', facility_data.naics_code,
      'mailingAddress', jsonb_build_object(
        'streetAddress', org_data.operator_mailing_address,
        'city', org_data.operator_city,
        'province', org_data.operator_province,
        'postalCode', org_data.operator_postal_code
      )
    ), 'facility', jsonb_build_object(
      'facilityName', facility_data.facility_name,
      'facilityType', facility_data.facility_type,
      'bcghgid', facility_data.bcghgid,
      'naics', facility_data.naics_code,
      'mailingAddress', jsonb_build_object(
        'streetAddress', facility_data.facility_mailing_address,
        'city', facility_data.facility_city,
        'province', facility_data.facility_province,
        'postalCode', facility_data.facility_postal_code
      ),
      'isFacilityLocationDifferent', false
    ), 'operationalRepresentative', jsonb_build_object(
      'firstName', contact_data.first_name,
      'lastName', contact_data.last_name,
      'position', contact_data.position_title,
      'email', contact_data.email,
      'phone', contact_data.telephone,
      'fax', contact_data.fax,
      'mailingAddress', jsonb_build_object(
        'streetAddress', contact_data.contact_mailing_address,
        'city', contact_data.contact_city,
        'province', contact_data.contact_province,
        'postalCode', contact_data.contact_postal_code
      )
    )
  );

end;
$function$ language plpgsql strict volatile;

grant execute on function ggircs_portal.init_application_administration_form_result to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
