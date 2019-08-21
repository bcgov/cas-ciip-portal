-- Revert ggircs-portal:view_ciip_certifier from pg

BEGIN;

drop view ggircs_portal.ciip_certifier;


COMMIT;
