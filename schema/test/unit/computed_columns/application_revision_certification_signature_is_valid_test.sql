set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

select has_function(
  'ggircs_portal', 'application_revision_certification_signature_is_valid', array['ggircs_portal.application_revision'],
  'Function ggircs_portal.application_revision_certification_signature_is_valid should exist'
);

truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.certification_url cascade;
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain(1);
insert into ggircs_portal.certification_url(application_id, version_number)
values (1,1);
update ggircs_portal.certification_url set certification_signature = 'signed';

select results_eq(
  $$
    with revision as (select row(ar.*)::ggircs_portal.application_revision from ggircs_portal.application_revision ar where application_id=1 and version_number=1)
    select ggircs_portal.application_revision_certification_signature_is_valid((select * from revision));
  $$,
  ARRAY['true'::boolean],
  'Computed column returns true when the form_results_md5 column matches the current hash of the form results and certification signature is defined'
);

update ggircs_portal.certification_url set certification_signature=null where application_id=1 and version_number=1;

select results_eq(
  $$
    with revision as (select row(ar.*)::ggircs_portal.application_revision from ggircs_portal.application_revision ar where application_id=1 and version_number=1)
    select ggircs_portal.application_revision_certification_signature_is_valid((select * from revision));
  $$,
  ARRAY['false'::boolean],
  'Computed column returns false when the signature is undefined'
);
update ggircs_portal.certification_url set certification_signature='signed' where application_id=1 and version_number=1;
update ggircs_portal.certification_url set form_results_md5='abc' where application_id=1 and version_number=1;

select results_eq(
  $$
    with revision as (select row(ar.*)::ggircs_portal.application_revision from ggircs_portal.application_revision ar where application_id=1 and version_number=1)
    select ggircs_portal.application_revision_certification_signature_is_valid((select * from revision));
  $$,
  ARRAY['false'::boolean],
  'Computed column returns false when the form_results_md5 column does not match the current hash of the form results'
);

select finish();

rollback;
