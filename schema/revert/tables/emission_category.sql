-- Revert ggircs-portal:tables/emission_category from pg

BEGIN;

drop table ggircs_portal.emission_category;

COMMIT;
