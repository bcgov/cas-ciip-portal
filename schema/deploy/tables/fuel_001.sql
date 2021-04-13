-- Deploy ggircs-portal:tables/fuel_001 to pg
-- requires: tables/fuel

begin;

alter table ggircs_portal.fuel add column comments varchar(10000);

comment on column ggircs_portal.fuel.comments is 'Metadata about this fuel row';

commit;
