-- Deploy ggircs-portal:policies/benchmark_policies to pg
-- requires: tables/benchmark

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_benchmark', 'benchmark', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_benchmark', 'benchmark', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_benchmark', 'benchmark', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_benchmark', 'benchmark', 'select', 'ciip_analyst', 'true');

end
$policy$;

commit;
