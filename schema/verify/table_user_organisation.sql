-- Verify ggircs-portal:table_user_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.user_organisation', 'select');

rollback;
