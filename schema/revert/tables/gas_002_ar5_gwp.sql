-- Revert ggircs-portal:tables/gas_002_ar5_gwp from pg

begin;

alter table ggircs_portal.gas add column gwp numeric;

commit;
