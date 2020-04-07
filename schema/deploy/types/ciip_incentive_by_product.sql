-- Deploy ggircs-portal:types/ciip_incentive_payment to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.ciip_incentive_by_product as (
  id integer,
  product_id integer,
  product_name varchar(1000),
  product_amount numeric,
  product_emissions numeric,
  incentive_ratio numeric,
  incentive_multiplier numeric,
  payment_allocation_factor numeric,
  carbon_tax numeric,
  incentive_product numeric,
  emission_intensity numeric,
  benchmark numeric,
  eligibility_threshold numeric
);

commit;
