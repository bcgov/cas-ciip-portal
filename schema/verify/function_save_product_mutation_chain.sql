-- Verify ggircs-portal:procedure_save_product on pg

begin;

select pg_get_functiondef('ggircs_portal.save_product_mutation_chain(int,varchar,varchar,varchar,varchar, int ARRAY)'::regprocedure);

rollback;
