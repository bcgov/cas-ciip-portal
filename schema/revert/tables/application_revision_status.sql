-- Revert ggircs-portal:table_application from pg

begin;

drop table ggircs_portal.application_revision_status;
drop function ggircs_portal.get_valid_applications_via_revision_status;

commit;
