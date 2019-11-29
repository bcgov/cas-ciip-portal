-- Revert ggircs-portal:type_ciip_application_status from pg

begin;

drop type ggircs_portal.ciip_application_status;

commit;
