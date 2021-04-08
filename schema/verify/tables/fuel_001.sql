-- Verify ggircs-portal:tables/fuel_001 on pg

BEGIN;

select comments from ggircs_portal.fuel;

ROLLBACK;
