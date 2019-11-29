-- Verify ggircs-portal:table_flag on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.review_comment', 'select');

rollback;
