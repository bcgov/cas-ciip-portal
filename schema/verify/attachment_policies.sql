-- Verify ggircs-portal:attachment_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_attachment', 'attachment', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_attachment', 'attachment', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_attachment', 'attachment', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_attachment', 'attachment', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_attachment', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_attachment', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_attachment', 'attachment', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('delete', 'ciip_industry_user_delete_attachment', 'attachment', 'ciip_industry_user');

rollback;
