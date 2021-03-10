-- Verify ggircs-portal:types/review_step_name on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.review_step_name', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'review_step_name', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'review_step_name', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'review_step_name', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'review_step_name', 'ciip_analyst');

rollback;
