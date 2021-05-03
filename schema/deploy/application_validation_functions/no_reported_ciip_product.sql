-- Deploy ggircs-portal:application_validation_functions/no_reported_ciip_product to pg
-- requires: tables/application_revision_validation_function
-- requires: computed_columns/application_revision_production_form_data
-- requires: computed_columns/application_revision_validation

begin;

create or replace function ggircs_portal.no_reported_ciip_product(app_revision ggircs_portal.application_revision)
  returns boolean
  as $$

    select exists (
      select * from ggircs_portal.application_revision_production_form_data(app_revision) pfd
      join ggircs_portal.product p
      on pfd.product_id = p.id
      and p.is_ciip_product = true
      and p.is_energy_product = false
      and pfd.product_amount > 0
    );

$$ language sql stable;

grant execute on function ggircs_portal.no_reported_ciip_product to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.no_reported_ciip_product(ggircs_portal.application_revision) is 'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if it contains at least one valid ciip product reported';

insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
values (
  'no_reported_ciip_product',
  'determines if an application has at least one valid ciip product reported',
  'There is no reported production of a primary (non-energy) product. At least one product must be reported.'
);

commit;
