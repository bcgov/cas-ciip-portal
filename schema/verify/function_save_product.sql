-- Verify ggircs-portal:procedure_save_product on pg

begin;

select pg_get_functiondef('ggircs_portal.save_product(int,varchar,varchar,varchar,int ARRAY,int)'::regprocedure);

rollback;
