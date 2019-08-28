-- Revert ggircs-portal:view_ciip_contact from pg

BEGIN;

drop view ggircs_portal.ciip_contact;

COMMIT;
