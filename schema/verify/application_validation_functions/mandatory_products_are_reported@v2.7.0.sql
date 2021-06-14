-- Verify ggircs-portal:application_validation_functions/mandatory_products_are_reported on pg

begin;

select pg_get_functiondef('ggircs_portal.mandatory_products_are_reported(ggircs_portal.application_revision)'::regprocedure);

rollback;
