-- Verify ggircs-portal:trigger_functions/protect_read_only_products on pg

begin;

select pg_get_functiondef('ggircs_portal_private.protect_read_only_products()'::regprocedure);

rollback;
