-- Revert ggircs-portal:types/application_revision_fuel_carbon_tax from pg

begin;

drop type ggircs_portal.application_revision_fuel_carbon_tax;

commit;
