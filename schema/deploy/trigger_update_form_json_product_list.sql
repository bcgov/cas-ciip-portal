-- Deploy ggircs-portal:trigger_update_form_json_product_list to pg
-- requires: function_update_form_json_product_list

BEGIN;

create trigger update_form_json_product_list

    after insert or update on ggircs_portal.product
    for each statement
    execute procedure ggircs_portal.update_form_json_product_list();

COMMIT;
