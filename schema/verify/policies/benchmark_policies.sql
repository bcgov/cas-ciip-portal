-- Verify ggircs-portal:policies/benchmark_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_benchmark', 'benchmark', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_benchmark', 'benchmark', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_benchmark', 'benchmark', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_benchmark', 'benchmark', 'ciip_analyst');

rollback
