-- Revert ggircs-portal:view_estimated_carbon_tax_paid from pg

begin;

drop view ggircs_portal.estimated_carbon_tax_paid;

commit;
