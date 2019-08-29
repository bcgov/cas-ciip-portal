-- Revert ggircs-portal:materialized_view_estimated_carbon_tax_paid from pg

BEGIN;

drop materialized view ggircs_portal.estimated_carbon_tax_paid;

COMMIT;
