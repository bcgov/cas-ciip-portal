-- Revert ggircs-portal:policies/benchmark_policies from pg

begin;

drop policy ciip_administrator_select_benchmark on ggircs_portal.benchmark;
drop policy ciip_administrator_insert_benchmark on ggircs_portal.benchmark;
drop policy ciip_administrator_update_benchmark on ggircs_portal.benchmark;

drop policy ciip_analyst_select_benchmark on ggircs_portal.benchmark;

commit;
