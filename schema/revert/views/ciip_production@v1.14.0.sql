-- Revert ggircs-portal:view_ciip_production from pg

begin;

drop view ggircs_portal.ciip_production;

commit;
