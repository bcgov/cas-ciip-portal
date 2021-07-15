-- Deploy ggircs-portal:views/ciip_incentive_per_product to pg

begin;

create view ggircs_portal.ciip_incentive_per_product as (
  with latest_submitted_version as (
    select application_id, max(version_number) as version_number
    from ggircs_portal.application_revision_status
    where application_revision_status='submitted'
    group by application_id
  )
  select ar.application_id, ar.version_number, product_id, product_name, product_amount, product_emissions, incentive_ratio, incentive_multiplier,
        payment_allocation_factor, incremental_carbon_tax, incentive_product, incentive_product_max, emission_intensity, benchmark, eligibility_threshold
  from latest_submitted_version
  join ggircs_portal.application_revision ar
  on ar.application_id = latest_submitted_version.application_id
  and ar.version_number = latest_submitted_version.version_number
  join lateral ggircs_portal.application_revision_ciip_incentive(row(ar.*)::ggircs_portal.application_revision) incentive on true
  order by ar.application_id, product_id
);

comment on view ggircs_portal.ciip_incentive_per_product is E'@omit/nReturns a record for each benchmarked product contained in the latest version of submitted applications';
comment on column ggircs_portal.ciip_incentive_per_product.application_id is 'The id of the application this product is reported in';
comment on column ggircs_portal.ciip_incentive_per_product.version_number is 'The most recent submitted version number for the application';
comment on column ggircs_portal.ciip_incentive_per_product.product_id is 'The ID of the benchmarked product';
comment on column ggircs_portal.ciip_incentive_per_product.product_name is 'The name of the benchmarked product';
comment on column ggircs_portal.ciip_incentive_per_product.product_amount is 'The production amount reported in the application';
comment on column ggircs_portal.ciip_incentive_per_product.product_emissions is 'The emissions allocated to the product (manually or automatically)';
comment on column ggircs_portal.ciip_incentive_per_product.incentive_ratio is 'The incentive ratio of the product, calculated using the CIIP incentive formula';
comment on column ggircs_portal.ciip_incentive_per_product.incentive_multiplier is 'The incentive multiplier for the product, configured by the CIIP administrator';
comment on column ggircs_portal.ciip_incentive_per_product.payment_allocation_factor is 'The part of the incentive that will be assigned to this product, defined based on the emissions allocated to the product';
comment on column ggircs_portal.ciip_incentive_per_product.incremental_carbon_tax is 'The incremental carbon tax allocated to this product';
comment on column ggircs_portal.ciip_incentive_per_product.incentive_product is 'The incentive product of the benchmarked product';
comment on column ggircs_portal.ciip_incentive_per_product.incentive_product_max is 'The maximum incentive for the product (i.e., incremental_carbon_tax * incentive_multiplier)';
comment on column ggircs_portal.ciip_incentive_per_product.emission_intensity is 'The emission intensity for the product (i.e. product_emissions / product_amount)';
comment on column ggircs_portal.ciip_incentive_per_product.benchmark is 'The benchmark for this product, for the application reporting year, configured by the CIIP administrator';
comment on column ggircs_portal.ciip_incentive_per_product.eligibility_threshold is 'The threshold for this product, for the application reporting year, configured by the CIIP administrator';

commit;
