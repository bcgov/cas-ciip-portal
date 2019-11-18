-- Revert ggircs-portal:type_statuses from pg

begin;

drop type ggircs_portal.ciip_user_organisation_status;

commit;
