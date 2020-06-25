-- Revert ggircs-portal:policies/facility_policies from pg

begin;


drop policy ciip_administrator_select_facility on ggircs_portal.facility;
drop policy ciip_administrator_insert_facility on ggircs_portal.facility;
drop policy ciip_administrator_update_facility on ggircs_portal.facility;

drop policy ciip_analyst_select_facility on ggircs_portal.facility;
drop policy ciip_analyst_insert_facility on ggircs_portal.facility;
drop policy ciip_analyst_update_facility on ggircs_portal.facility;

drop policy ciip_industry_user_select_facility on ggircs_portal.facility;
drop policy ciip_industry_user_insert_facility on ggircs_portal.facility;

drop policy certifier_select_facility on ggircs_portal.facility;

drop function ggircs_portal_private.get_valid_facility_organisation;
drop function ggircs_portal_private.get_valid_facility_for_certifier;

commit;
