-- Revert ggircs-portal:view_ciip_contact from pg

begin;

drop view ggircs_portal.ciip_contact;

commit;
