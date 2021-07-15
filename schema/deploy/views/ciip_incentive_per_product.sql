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

commit;
