-- Verify ggircs-portal:tables/application_review_step on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_review_step', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'application_review_step', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'application_review_step', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'application_review_step', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'application_review_step', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'application_review_step', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'application_review_step', 'ciip_analyst');

rollback;
