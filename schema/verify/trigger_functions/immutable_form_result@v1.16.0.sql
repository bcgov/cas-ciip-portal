-- Verify ggircs-portal:trigger_functions/immutable-form-result on pg

begin;

select pg_get_functiondef('ggircs_portal_private.immutable_form_result()'::regprocedure);

rollback;
