-- Revert ggircs-portal:trigger_update_form_json_product_list from pg

BEGIN;

drop trigger if exists update_form_json_product_list on ggircs_portal.product;

COMMIT;
