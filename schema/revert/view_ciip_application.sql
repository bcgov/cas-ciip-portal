-- Revert ggircs-portal:view_ciip_application from pg

begin;

drop view ggircs_portal.ciip_application;

commit;
