-- Verify ggircs-portal:table_benchmark on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.benchmark', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'benchmark', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'benchmark', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'benchmark', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'benchmark', 'ciip_analyst');

rollback;
