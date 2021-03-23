-- Verify ggircs-portal:mutations/create_fuel_naics_code on pg

begin;

select pg_get_functiondef('ggircs_portal.create_fuel_naics_code(int, int)'::regprocedure);

rollback;
