-- Verify ggircs-portal:function_update_form_json_product_list on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.update_form_json_product_list()'::regprocedure);

ROLLBACK;
