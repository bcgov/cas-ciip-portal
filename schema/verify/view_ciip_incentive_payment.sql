-- Verify ggircs-portal:view_ciip_incentive_payment on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_incentive_payment', 'select');

rollback;
