-- Verify test_helpers:create_products on pg

BEGIN;

select pg_get_functiondef('test_helper.create_product(int, text, text, ggircs_portal.ciip_product_state, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, timestamp)'::regprocedure);

ROLLBACK;
