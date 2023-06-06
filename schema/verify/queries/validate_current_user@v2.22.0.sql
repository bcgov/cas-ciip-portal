-- Verify ggircs-portal:queries/validate_current_user on pg

begin;

select pg_get_functiondef('ggircs_portal.validate_current_user()'::regprocedure);

rollback;
