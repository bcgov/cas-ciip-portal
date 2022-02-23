-- Deploy ggircs-portal:function_get_carbon_tax_data to pg
-- requires: schema_ggircs_portal

begin;

  alter type ggircs_portal.carbon_tax_data alter attribute unit_conversion_factor type numeric;

  drop function ggircs_portal.get_carbon_tax_data;
  drop type ggircs_portal.carbon_tax_data;

commit;
