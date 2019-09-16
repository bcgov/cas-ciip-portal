-- Revert ggircs-portal:view_ciip_application from pg

BEGIN;

drop view ggircs_portal.ciip_application;

COMMIT;
