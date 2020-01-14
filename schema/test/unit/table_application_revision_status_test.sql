set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_table(
    'ggircs_portal', 'application_revision_status',
    'ggircs_portal.application_revision_status should exist, and be a table'
);

select has_index(
    'swrs_transform', 'address', 'ggircs_address_primary_key',
    'swrs_transform.address should have a primary key'
);

select columns_are('swrs_transform'::name, 'address'::name, array[
    'id'::name,
    'ghgr_import_id'::name,
    'swrs_facility_id'::name,
    'swrs_organisation_id'::name,
    'path_context'::name,
    'type'::name,
    'contact_idx'::name,
    'parent_organisation_idx'::name,
    'physical_address_municipality'::name,
    'physical_address_unit_number'::name,
    'physical_address_street_number'::name,
    'physical_address_street_number_suffix'::name,
    'physical_address_street_name'::name,
    'physical_address_street_type'::name,
    'physical_address_street_direction'::name,
    'physical_address_prov_terr_state'::name,
    'physical_address_postal_code_zip_code'::name,
    'physical_address_country'::name,
    'physical_address_national_topographical_description'::name,
    'physical_address_additional_information'::name,
    'physical_address_land_survey_description'::name,

    'mailing_address_delivery_mode'::name,
    'mailing_address_po_box_number'::name,
    'mailing_address_unit_number'::name,
    'mailing_address_rural_route_number'::name,
    'mailing_address_street_number'::name,
    'mailing_address_street_number_suffix'::name,
    'mailing_address_street_name'::name,
    'mailing_address_street_type'::name,
    'mailing_address_street_direction'::name,
    'mailing_address_municipality'::name,
    'mailing_address_prov_terr_state'::name,
    'mailing_address_postal_code_zip_code'::name,
    'mailing_address_country'::name,
    'mailing_address_additional_information'::name,

    'geographic_address_latitude'::name,
    'geographic_address_longitude'::name
]);

select col_type_is(      'swrs_transform', 'address', 'ghgr_import_id', 'integer', 'address.ghgr_import_id column should be type integer');
select col_hasnt_default('swrs_transform', 'address', 'ghgr_import_id', 'address.ghgr_import_id column should not have a default value');

--  select has_column(       'swrs_transform', 'address', 'swrs_facility_id', 'address.swrs_facility_id column should exist');
select col_type_is(      'swrs_transform', 'address', 'swrs_facility_id', 'integer', 'address.swrs_facility_id column should be type numeric');
select col_is_null(      'swrs_transform', 'address', 'swrs_facility_id', 'address.swrs_facility_id column should allow null');
select col_hasnt_default('swrs_transform', 'address', 'swrs_facility_id', 'address.swrs_facility_id column should not have a default');

select finish();
rollback;
