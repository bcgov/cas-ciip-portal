-- Revert ggircs-portal:table_application_revision from pg

begin;

drop table ggircs_portal.application_revision;
drop function ggircs_portal.get_valid_applications_via_revision;

commit;
