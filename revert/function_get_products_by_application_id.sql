-- Revert ggircs-portal:function_get_products_by_application_id from pg

BEGIN;

drop function ggircs_portal.get_products_by_application_id;

COMMIT;
