-- Revert ggircs-portal:function_get_products_by_bcghgid from pg

BEGIN;

drop function ggircs_portal.get_products_by_bcghgid;

COMMIT;
