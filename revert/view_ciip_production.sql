-- Revert ggircs-portal:view_ciip_production from pg

BEGIN;

drop view ggircs_portal.ciip_production;

COMMIT;
