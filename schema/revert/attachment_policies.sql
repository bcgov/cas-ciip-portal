-- Revert ggircs-portal:attachment_policies from pg

begin;

drop policy ciip_administrator_select_attachment on ggircs_portal.attachment;
drop policy ciip_administrator_insert_attachment on ggircs_portal.attachment;
drop policy ciip_administrator_update_attachment on ggircs_portal.attachment;

drop policy ciip_analyst_select_attachment on ggircs_portal.attachment;
drop policy ciip_analyst_insert_attachment on ggircs_portal.attachment;
drop policy ciip_analyst_update_attachment on ggircs_portal.attachment;

drop policy ciip_industry_user_select_attachment on ggircs_portal.attachment;
drop policy ciip_industry_user_insert_attachment on ggircs_portal.attachment;
drop policy ciip_industry_user_update_attachment on ggircs_portal.attachment;

commit;
