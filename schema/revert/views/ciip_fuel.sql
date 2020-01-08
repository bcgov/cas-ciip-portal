-- Revert ggircs-portal:view_ciip_fuel from pg

begin;

drop view ggircs_portal.ciip_fuel;

commit;
