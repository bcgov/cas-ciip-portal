-- Revert ggircs-portal:table_ciip_application_wizard from pg

begin;

drop table ggircs_portal.ciip_application_wizard;

commit;
