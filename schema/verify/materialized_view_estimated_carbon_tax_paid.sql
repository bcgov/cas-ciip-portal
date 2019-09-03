-- Verify ggircs-portal:materialized_view_estimated_carbon_tax_paid on pg

BEGIN;

select * from ggircs_portal.estimated_carbon_tax_paid where false;

ROLLBACK;
