set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'application_revision_is_immutable', array['ggircs_portal.application_revision'],
  'Function ggircs_portal.application_revision_is_immutable should exist'
);

select is (
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 1 and version_number = 1
    ) select * from ggircs_portal.application_revision_is_immutable((select * from record))
  ),
  True::boolean,
  'Returns true if application revision is immutabled (has been submitted)'
);

select is (
  (
    with record as (
      select row(application_revision.*)::ggircs_portal.application_revision
      from ggircs_portal.application_revision where application_id = 2 and version_number = 1
    ) select * from ggircs_portal.application_revision_is_immutable((select * from record))
  ),
  False::boolean,
  'Returns false if application revision is editable (has not been submitted)'
);

select finish();

rollback;
