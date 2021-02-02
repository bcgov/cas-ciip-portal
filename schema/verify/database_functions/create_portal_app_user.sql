-- Verify ggircs-portal:database_functions/create_portal_app_user on pg

begin;

select false from pg_roles where rolname='portal_app';
select true from pg_roles where rolname='ciip_portal';

rollback;
