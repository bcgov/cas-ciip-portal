-- Verify ggircs-portal:function_get_swrs_fuel_data on pg

begin;

select pg_get_functiondef('ggircs_portal.get_swrs_fuel_data(integer, integer)'::regprocedure);

rollback;
