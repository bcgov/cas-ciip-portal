-- Revert ggircs-portal:tables/fuel_001 from pg

BEGIN;

alter table ggircs_portal.fuel drop column comments;

COMMIT;
