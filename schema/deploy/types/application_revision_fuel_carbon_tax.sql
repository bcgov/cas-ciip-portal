-- Deploy ggircs-portal:types/application_revision_fuel_carbon_tax to pg

begin;

create type ggircs_portal.application_revision_fuel_carbon_tax as(
  application_id int,
  version_number int,
  fuel_id int,
  emission_category_id int,
  fuel_amount numeric,
  carbon_tax numeric,
  carbon_tax_eligible_for_ciip numeric,
  reporting_year_fuel_charge numeric,
  pre_increase_fuel_charge numeric
);

commit;
