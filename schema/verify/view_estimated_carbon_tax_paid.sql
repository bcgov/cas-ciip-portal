-- Verify ggircs-portal:view_estimated_carbon_tax_paid on pg

begin;

select * from ggircs_portal.estimated_carbon_tax_paid where false;

rollback;
