-- Revert ggircs-portal:view_ciip_electricity_and_heat from pg

begin;

drop view ggircs_portal.ciip_electricity_and_heat;

commit;
