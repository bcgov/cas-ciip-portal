-- Revert ggircs-portal:trigger_functions/protect_read_only_products from pg

begin;

drop function ggircs_portal_private.protect_read_only_products;

commit;
