-- Verify ggircs-portal:trigger_functions/signature_md5 on pg

begin;

select pg_get_functiondef('ggircs_portal_private.signature_md5()'::regprocedure);

rollback;
