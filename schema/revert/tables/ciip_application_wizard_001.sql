-- Revert ggircs-portal:tables/ciip_application_wizard_001 from pg

begin;

alter table ggircs_portal.ciip_application_wizard drop column is_active;

commit;
