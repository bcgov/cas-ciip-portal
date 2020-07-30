-- Verify ggircs-portal:database_functions/read_only_user_policies on pg

begin;

select pg_get_functiondef('ggircs_portal_private.read_only_user_policies(text)'::regprocedure);

rollback;
