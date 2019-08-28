-- Revert ggircs-portal:schema_ggircs_portal from pg

BEGIN;

drop schema ggircs_portal;

COMMIT;
