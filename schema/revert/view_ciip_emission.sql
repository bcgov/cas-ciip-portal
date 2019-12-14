-- Revert ggircs-portal:view_ciip_emission from pg

begin;

drop view ggircs_portal.ciip_emission;

commit;
