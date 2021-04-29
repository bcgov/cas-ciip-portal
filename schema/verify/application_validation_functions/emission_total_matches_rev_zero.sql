-- Verify ggircs-portal:application_validation_functions/emission_total_matches_rev_zero on pg

begin;

select pg_get_functiondef('ggircs_portal.emission_total_matches_rev_zero(ggircs_portal.application_revision)'::regprocedure);

rollback;
