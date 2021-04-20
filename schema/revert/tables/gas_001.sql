-- Revert ggircs-portal:tables/gas_001 from pg

begin;

alter table ggircs_portal.gas drop column is_ciip_emission;
drop index ggircs_portal.gas_gas_type_uindex;

commit;
