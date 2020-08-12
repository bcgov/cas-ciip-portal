-- Revert ggircs-portal:views/ciip_admin from pg

begin;

drop view ggircs_portal.ciip_admin;

commit;
