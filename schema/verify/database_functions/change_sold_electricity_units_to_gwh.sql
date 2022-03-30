-- Verify ggircs-portal:database_functions/change_sold_electricity_units_to_GWh on pg

begin;

select pg_get_functiondef('ggircs_portal_private.change_sold_electricity_units_to_gwh()'::regprocedure);

rollback;
