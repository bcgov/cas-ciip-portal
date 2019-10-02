-- Revert ggircs-portal:table_user_details from pg

BEGIN;

drop table ggircs_portal.user_details;


COMMIT;
