-- Verify ggircs-portal:trigger_functions/signature_md5 on pg

begin;

select pg_get_functiondef('ggircs_portal.signature_md5()'::regprocedure);

rollback;
