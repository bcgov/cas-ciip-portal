-- Revert ggircs-portal:table_product_benchmark from pg

BEGIN;

drop table ggircs_portal.product_benchmark;

COMMIT;
