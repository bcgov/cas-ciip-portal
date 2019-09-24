-- Revert ggircs-portal:function_get_form_json_with_products from pg

BEGIN;

drop function ggircs_portal.get_form_json_with_products;
drop type form_json_product_type;

COMMIT;
