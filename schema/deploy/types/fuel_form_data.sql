-- Deploy ggircs-portal:types/fuel_form_data to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.fuel_form_data as (
  quantity numeric,
  fuel_id integer,
  fuel_units varchar(1000),
  emission_category_id numeric,
  fuel_type varchar(1000),
  fuel_type_alt varchar(1000),
  fuel_description varchar(1000),
  associated_emissions numeric,
  comments varchar(10000)
);

comment on type ggircs_portal.fuel_form_data is 'Type defines the shape of the data contained in a fuel form_result';

commit;
