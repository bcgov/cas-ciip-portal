-- Revert ggircs-portal:table_benchmark from pg

BEGIN;

drop table ggircs_portal.benchmark;

COMMIT;
