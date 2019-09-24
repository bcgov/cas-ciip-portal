-- Verify ggircs-portal:function_get_form_json_with_products on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.get_form_json_with_products(numeric)'::regprocedure);

ROLLBACK;
