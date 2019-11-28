-- Revert ggircs-portal:view_ciip_carbon_tax_calculation from pg

begin;

drop view ggircs_portal.ciip_carbon_tax_calculation;

commit:
