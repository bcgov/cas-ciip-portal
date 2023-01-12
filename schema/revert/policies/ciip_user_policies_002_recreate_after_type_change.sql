-- Revert ggircs-portal:policies/ciip_user_policies_002_recreate_after_type_change from pg

begin;

drop policy ciip_analyst_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_analyst_update_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_update_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_guest_select_ciip_user on ggircs_portal.ciip_user;

commit;

