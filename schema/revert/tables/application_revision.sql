-- Revert ggircs-portal:table_application_revision from pg

begin;

drop table ggircs_portal.application_revision;

commit;
