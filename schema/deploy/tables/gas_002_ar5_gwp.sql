-- Deploy ggircs-portal:tables/gas_002_ar5_gwp to pg
-- requires: tables/gas_001

begin;

alter table ggircs_portal.gas drop column gwp;

commit;
