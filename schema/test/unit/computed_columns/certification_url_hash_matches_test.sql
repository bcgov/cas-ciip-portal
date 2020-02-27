set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'certification_url_hash_matches', array['ggircs_portal.certification_url'],
  'Function ggircs_portal.certification_url_hash_matches should exist'
);

truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.certification_url cascade;
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain(1);
insert into ggircs_portal.certification_url(application_id, version_number)
values (1,1);

select results_eq(
  $$
    with certification as (select row(c.*)::ggircs_portal.certification_url from ggircs_portal.certification_url c where application_id=1 and version_number=1)
    select ggircs_portal.certification_url_hash_matches((select * from certification));
  $$,
  ARRAY['true'::boolean],
  'Computed column returns true when the form_results_md5 column matches the current hash of the form results'
);

update ggircs_portal.certification_url set form_results_md5='abc' where application_id=1 and version_number=1;

select results_eq(
  $$
    with certification as (select row(c.*)::ggircs_portal.certification_url from ggircs_portal.certification_url c where application_id=1 and version_number=1)
    select ggircs_portal.certification_url_hash_matches((select * from certification));
  $$,
  ARRAY['false'::boolean],
  'Computed column returns false when the form_results_md5 column does not match the current hash of the form results'
);

select finish();

rollback;
