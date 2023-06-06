-- Verify ggircs-portal:mutations/create_or_update_ciip_user on pg

begin;

select pg_get_functiondef('ggircs_portal.create_or_update_ciip_user(text, text, text, text)'::regprocedure);

rollback;
