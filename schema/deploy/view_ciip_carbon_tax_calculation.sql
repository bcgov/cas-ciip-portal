-- Deploy ggircs-portal:view_ciip_carbon_tax_calculation to pg
-- requires: function_get_carbon_tax_data
-- requires: view_ciip_fuel
-- requires: table_application

begin;

  create view ggircs_portal.ciip_carbon_tax_calculation as (
    with x as (
      select ggircs_portal.get_carbon_tax_data()
    )
    select * from x
 );

commit;
