-- Revert ggircs-portal:table_user from pg

BEGIN;

drop table  ggircs_portal.user cascade;

COMMIT;
