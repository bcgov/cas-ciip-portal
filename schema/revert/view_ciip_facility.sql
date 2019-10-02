-- Revert ggircs-portal:view_ciip_facility from pg

begin;

drop view ggircs_portal.ciip_facility;

commit;
