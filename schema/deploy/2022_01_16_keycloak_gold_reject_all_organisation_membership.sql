-- Deploy ggircs-portal:2022_01_16_keycloak_gold_reject_all_organisation_membership to pg

begin;

-- As we migrate to keycloak gold, we reject all ciip_user_organisation permissions,
-- to ensure user accounts don't inherit someone else's access permissions (on the odd chance of a changed email address).
update ggircs_portal.ciip_user_organisation set status='rejected';

commit;