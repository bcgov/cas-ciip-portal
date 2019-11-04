-- Verify ggircs-portal:function_get_products_by_application_id on pg

begin;

select pg_get_functiondef('ggircs_portal.get_products_by_application_id(text)'::regprocedure);

rollback;
