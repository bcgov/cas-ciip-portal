-- Deploy ggircs-portal:view_ciip_facility to pg
-- requires: table_form_result

begin;

  create view ggircs_portal.ciip_facility as (
    with x as (
      select
        form_result.application_id as id,
        json_array_elements((form_result -> 'facilityInformation')::json) as facility_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Admin'
    )
    select
       x.id,
       (x.facility_data ->> 'bcghgid')::numeric as bcghgid,
       (x.facility_data ->> 'latitude')::numeric as latitude,
       (x.facility_data ->> 'longitude')::numeric as longitude,
       (x.facility_data ->> 'naicsCode')::numeric as naics_code,
       (x.facility_data ->> 'facilityName')::varchar(1000) as facility_name,
       (x.facility_data ->> 'facilityType')::varchar(1000) as facility_type,
       (x.facility_data ->> 'facilityDescription')::varchar(10000) as facility_description
       -- add facility address to address view
    from x
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_facility is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_facility is 'The view for facility data reported in the application';
-- comment on column ggircs_portal.ciip_facility.facility_name is 'The name of the facility';
-- comment on column ggircs_portal.ciip_facility.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_facility.latitude is 'The facility latitude';
-- comment on column ggircs_portal.ciip_facility.longitude is 'The facility longitude';
-- comment on column ggircs_portal.ciip_facility.naics_code is 'The facility naics code';
-- comment on column ggircs_portal.ciip_facility.facility_type is 'The facility type';
-- comment on column ggircs_portal.ciip_facility.facility_description is 'The description of the facility';

commit;
