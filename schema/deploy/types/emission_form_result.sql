-- Deploy ggircs-portal:types/emission_form_result to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.emission_form_result as (
  source_type_name varchar(1000),
  gwp numeric,
  gas_type varchar(1000),
  annual_co2e numeric,
  annual_emission numeric,
  gas_description varchar(1000),
  comments varchar (10000)
);

comment on type ggircs_portal.emission_form_result is 'Type defines the shape of an emission form_result';

commit;
