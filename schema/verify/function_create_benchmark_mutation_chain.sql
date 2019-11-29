-- Verify ggircs-portal:function_create_benchmark on pg

begin;

select pg_get_functiondef('ggircs_portal.create_benchmark_mutation_chain(int, int, int, timestamptz, timestamptz, int)'::regprocedure);

rollback;
