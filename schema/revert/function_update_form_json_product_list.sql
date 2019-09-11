-- Revert ggircs-portal:function_update_form_json_product_list from pg

BEGIN;

drop function ggircs_portal.update_form_json_product_list;

COMMIT;
