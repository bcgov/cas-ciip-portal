-- Revert ggircs-portal:table_application from pg

begin;

drop table ggircs_portal.application_status;

commit;
