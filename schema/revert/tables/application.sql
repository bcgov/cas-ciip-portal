-- Revert ggircs-portal:table_application from pg

begin;

drop table ggircs_portal.application;
drop function ggircs_portal_private.get_valid_application_facilities;

commit;
