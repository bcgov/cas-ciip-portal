-- Revert ggircs-portal:view_ciip_fuel from pg

BEGIN;

drop view ggircs_portal.ciip_fuel;


COMMIT;
