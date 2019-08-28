-- Revert ggircs-portal:product from pg

BEGIN;

drop table ggircs_portal.product;

COMMIT;
