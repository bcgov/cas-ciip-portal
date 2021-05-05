-- Deploy ggircs-portal:application_validation_functions/mandatory_products_are_reported to pg
-- requires: tables/application_revision_validation_function

begin;

create or replace function ggircs_portal.mandatory_products_are_reported(app_rev ggircs_portal.application_revision)
  returns boolean as
  $function$

    with mandatory_product_ids as (
      select product_id from ggircs_portal.product_naics_code
      where is_mandatory = true
      and naics_code_id = (select id from ggircs_portal.application_revision_naics_code(app_rev))
    ),
    unreported_mandatory_product_ids as (
      select mandatory.product_id from mandatory_product_ids as mandatory
      left join ggircs_portal.application_revision_production_form_data(app_rev) as reported
      on mandatory.product_id = reported.product_id
      where reported.product_id is null
    )
    select count(*) = 0 from unreported_mandatory_product_ids;

  $function$
language sql stable;

comment on function ggircs_portal.mandatory_products_are_reported(app_rev ggircs_portal.application_revision) is
'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if the all mandatory products under the NAICS code have been reported.';

grant execute on function ggircs_portal.mandatory_products_are_reported to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
