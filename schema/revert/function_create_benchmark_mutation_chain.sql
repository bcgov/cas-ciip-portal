-- Revert ggircs-portal:function_create_benchmark from pg

begin;

drop function ggircs_portal.create_benchmark_mutation_chain;

commit;
