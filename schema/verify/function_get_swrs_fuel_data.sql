-- Verify ggircs-portal:function_get_swrs_fuel_data on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.get_swrs_fuel_data(integer, varchar)'::regprocedure);

ROLLBACK;
