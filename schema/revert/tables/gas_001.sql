-- Revert ggircs-portal:tables/gas_001 from pg

begin;

alter table ggircs_portal.gas drop column is_ciip_emission;

commit;
