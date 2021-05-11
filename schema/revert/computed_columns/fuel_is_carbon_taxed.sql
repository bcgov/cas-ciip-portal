-- Revert ggircs-portal:computed_columns/fuel_is_carbon_taxed from pg

begin;

drop function ggircs_portal.fuel_is_carbon_taxed;

commit;
