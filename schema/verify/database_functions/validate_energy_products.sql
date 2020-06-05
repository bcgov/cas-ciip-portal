-- Verify ggircs-portal:database_functions/validate_energy_products on pg

begin;

select pg_get_functiondef('ggircs_portal_private.validate_energy_products(ggircs_portal.ciip_production[])'::regprocedure);

rollback;
