-- Deploy ggircs-portal:types/production_form_data to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.production_form_data as (
  product_amount numeric,
  product_id integer,
  product_units varchar(1000),
  product_emissions numeric,
  requires_emission_allocation boolean,
  is_energy_product boolean,
  product_name varchar(1000),
  associated_emissions numeric,
  comments varchar(10000)
);

comment on type ggircs_portal.production_form_data is 'Type defines the shape of the data contained in a production form_result';

commit;
