set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(5);

select has_function(
  'ggircs_portal', 'application_revision_ciip_incentive', ARRAY['ggircs_portal.application_revision'],
  'Function application_revision_ciip_incentive should exist'
);

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
