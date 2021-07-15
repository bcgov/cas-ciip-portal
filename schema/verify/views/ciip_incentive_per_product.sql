-- Verify ggircs-portal:views/ciip_incentive_per_product on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_incentive_per_facility', 'select');

rollback;
