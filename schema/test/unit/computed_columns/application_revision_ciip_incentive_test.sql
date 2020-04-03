set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select no_plan();

-- setup products and benchmarks
truncate ggircs_portal.product, ggircs_portal.application restart identity cascade;
insert into ggircs_portal.product (
  id, name, state,
  requires_emission_allocation,
  is_ciip_product,
  add_purchased_electricity_emissions,
  subtract_exported_electricity_emissions,
  add_purchased_heat_emissions,
  subtract_exported_heat_emissions,
  subtract_generated_electricity_emissions,
  subtract_generated_heat_emissions
)
overriding system value
values
  (1, 'simple product (no allocation, emissions = facility emissions)', 'active',
  false, true, false, false, false, false, false, false )
;

insert into ggircs_portal.benchmark
(
  id,
  product_id,
  benchmark,
  eligibility_threshold,
  incentive_multiplier,
  start_reporting_year,
  end_reporting_year
)
overriding system value
values
(1, 1, 0.25, 0.75, 1, 2018, (select reporting_year from ggircs_portal.next_reporting_year()));

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Set a jwt token so that the created_by columns are not null on creation of application;
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

-- Create application
select ggircs_portal.create_application_mutation_chain(1);

select has_function(
  'ggircs_portal', 'application_revision_ciip_incentive', ARRAY['ggircs_portal.application_revision'],
  'Function application_revision_ciip_incentive should exist'
);

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'The application_revision_ciip_incentive function returns an empty result set if there are no products'
);


-- Test roles

set role ciip_administrator;

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'ciip_administrator can execute the application_revision_ciip_incentive function'
);

set role ciip_analyst;

select lives_ok(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
    'ciip_analyst can execute the application_revision_ciip_incentive function'
);

set role ciip_industry_user;

select throws_like(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
  'permission denied%',
    'ciip_industry_user cannot execute the application_revision_ciip_incentive function'
);

set role ciip_guest;

select throws_like(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_ciip_incentive((select * from record))
  $$,
  'permission denied%',
    'ciip_guest cannot execute the application_revision_ciip_incentive function'
);

select finish();
rollback;
