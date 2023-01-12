-- Deploy ggircs-portal:policies/ciip_user_policies_001_drop_before_type_change to pg

begin;

drop policy ciip_analyst_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_analyst_update_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_update_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_guest_select_ciip_user on ggircs_portal.ciip_user;

commit;
