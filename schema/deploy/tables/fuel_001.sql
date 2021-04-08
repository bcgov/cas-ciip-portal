-- Deploy ggircs-portal:tables/fuel_001 to pg
-- requires: tables/fuel

BEGIN;

alter table ggircs_portal.fuel add column comments text;

comment on column ggircs_portal.fuel.comments is 'Metadata about this fuel row';

COMMIT;
