-- Verify ggircs-portal:computed_columns/fuel_is_carbon_taxed on pg

begin;

select pg_get_functiondef('ggircs_portal.fuel_is_carbon_taxed(ggircs_portal.fuel)'::regprocedure);

rollback;
