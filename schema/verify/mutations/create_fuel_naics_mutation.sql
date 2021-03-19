-- Verify ggircs-portal:mutations/create_fuel_naics_mutation on pg

begin;

select pg_get_functiondef('ggircs_portal.create_fuel_naics_mutation(int, int)'::regprocedure);

rollback;
