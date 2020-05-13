-- Revert ggircs-portal:table_application from pg

begin;

drop table ggircs_portal.application_revision_status;

commit;
