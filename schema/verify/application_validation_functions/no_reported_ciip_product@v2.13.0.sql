-- Verify ggircs-portal:application_validation_functions/no_reported_ciip_product on pg

begin;

select pg_get_functiondef('ggircs_portal.no_reported_ciip_product(ggircs_portal.application_revision)'::regprocedure);

rollback;
