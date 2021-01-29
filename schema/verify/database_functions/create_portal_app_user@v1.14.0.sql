-- Verify ggircs-portal:database_functions/create_portal_app_user on pg

begin;

select true from pg_roles where rolname='portal_app';

rollback;
