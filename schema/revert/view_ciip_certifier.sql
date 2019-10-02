-- Revert ggircs-portal:view_ciip_certifier from pg

begin;

drop view ggircs_portal.ciip_certifier;

commit;
