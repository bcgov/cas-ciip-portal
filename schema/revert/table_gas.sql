-- Revert ggircs-portal:gas from pg

BEGIN;

drop table ggircs_portal.gas;

COMMIT;
