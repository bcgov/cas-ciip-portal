-- Verify ggircs-portal:trigger_update_form_json_product_list on pg

BEGIN;

select tgname from pg_trigger where not tgisinternal and tgname='update_form_json_product_list';

ROLLBACK;
