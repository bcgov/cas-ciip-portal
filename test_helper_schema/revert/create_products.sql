-- Revert test_helpers:create_products from pg

BEGIN;

drop function test_helper.create_product;

COMMIT;
