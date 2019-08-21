-- Revert ggircs-portal:view_ciip_facility from pg

BEGIN;

drop view ggircs_portal.ciip_facility;

COMMIT;
