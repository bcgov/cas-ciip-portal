-- Verify ggircs-portal:computed_columns/ciip_incentive_payment on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_ciip_incentive(ggircs_portal.application_revision)'::regprocedure);

rollback;
