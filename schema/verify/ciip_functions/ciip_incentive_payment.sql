-- Verify ggircs-portal:ciip_functions/ciip_incentive_payment on pg

begin;

select pg_get_functiondef('ggircs_portal.ciip_incentive_payment(numeric, numeric)'::regprocedure);

rollback;
