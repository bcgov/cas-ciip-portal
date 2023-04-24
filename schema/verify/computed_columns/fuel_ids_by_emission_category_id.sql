-- Verify ggircs-portal:computed_columns/fuel_ids_by_emission_category_id on pg

begin;

select pg_get_functiondef('ggircs_portal.fuel_ids_by_emission_category_id()'::regprocedure);

rollback;
