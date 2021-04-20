-- Deploy ggircs-portal:tables/gas_001 to pg
-- requires: tables/gas

begin;

alter table ggircs_portal.gas add column is_ciip_emission boolean default true;

comment on column ggircs_portal.fuel.comments is 'boolean column indicates whether this row should be included when totalling emissions in the context of CIIP (CleanBC Industrial Incentive Program)';

commit;
