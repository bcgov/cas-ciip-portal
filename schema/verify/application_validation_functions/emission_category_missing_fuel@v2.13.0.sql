-- Verify ggircs-portal:application_validation_functions/emission_category_missing_fuel on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_ciip_incentive(ggircs_portal.application_revision)'::regprocedure);

rollback;
