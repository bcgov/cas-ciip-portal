-- Revert ggircs-portal:table_application from pg

BEGIN;

drop table ggircs_portal.application;

COMMIT;
