-- Revert ggircs-portal:view_ciip_operator from pg

BEGIN;

drop view ggircs_portal.ciip_operator;

COMMIT;
