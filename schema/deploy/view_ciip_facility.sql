-- Deploy ggircs-portal:view_ciip_facility to pg
-- requires: table_form_result


BEGIN;
  create view ggircs_portal.ciip_facility as (
    with x as (
      select
        cast(id as text) as id,
        json_array_elements((form_result -> 'facility_information')::json) as facility_data
      from ggircs_portal.form_result
    )
    select
       x.id as application_id,
       x.facility_data ->> 'bcghgid' as bcghgid,
       x.facility_data ->> 'latitude' as latitude,
       x.facility_data ->> 'longitude' as longitude,
       x.facility_data ->> 'naics_code' as naics_code,
       x.facility_data ->> 'facility_name' as facility_name,
       x.facility_data ->> 'facility_type' as facility_type,
       x.facility_data ->> 'facility_description' as facility_description
       -- add facility address to address view
    from x
 );

comment on view ggircs_portal.ciip_facility is 'The view for facility data reported in the application';
comment on column ggircs_portal.ciip_facility.facility_name is 'The name of the facility';
comment on column ggircs_portal.ciip_facility.application_id is 'The application id used for reference and join';
comment on column ggircs_portal.ciip_facility.latitude is 'The facility latitude';
comment on column ggircs_portal.ciip_facility.longitude is 'The facility longitude';
comment on column ggircs_portal.ciip_facility.naics_code is 'The facility naics code';
comment on column ggircs_portal.ciip_facility.facility_type is 'The facility type';
comment on column ggircs_portal.ciip_facility.facility_description is 'The description of the facility';

COMMIT;

