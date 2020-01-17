set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

select has_function(
  'ggircs_portal', 'form_result_has_unresolved_comments', array['ggircs_portal.form_result'],
  'Function create_application_revision_mutation_chain should exist'
);

insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');

select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

select results_eq(
  $$
    with record as (select row( form_result.*)::ggircs_portal.form_result from ggircs_portal.form_result where application_id = (select max(id) from ggircs_portal.application) and version_number = 1 and form_id = 1)
    select * from ggircs_portal.form_result_has_unresolved_comments((select * from record));
  $$,
  ARRAY['false'::boolean],
  'form_result_has_unresolved_comments returns false if there are no comments'
);

insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type, resolved)
values ((select max(id) from ggircs_portal.application), 1, 'internal', 'internal'::ggircs_portal.review_comment_type, false);

select results_eq(
  $$
    with record as (select row( form_result.*)::ggircs_portal.form_result from ggircs_portal.form_result where application_id = (select max(id) from ggircs_portal.application) and version_number = 1 and form_id = 1)
    select * from ggircs_portal.form_result_has_unresolved_comments((select * from record));
  $$,
  ARRAY['false'::boolean],
  'form_result_has_unresolved_comments returns false if there are no requested change comments (but there are comments)'
);

insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type, resolved)
values ((select max(id) from ggircs_portal.application), 1, 'change', 'requested change'::ggircs_portal.review_comment_type, false);

select results_eq(
  $$
    with record as (select row( form_result.*)::ggircs_portal.form_result from ggircs_portal.form_result where application_id = (select max(id) from ggircs_portal.application) and version_number = 1 and form_id = 1)
    select * from ggircs_portal.form_result_has_unresolved_comments((select * from record));
  $$,
  ARRAY['true'::boolean],
  'form_result_has_unresolved_comments returns false if there are requested change comments'
);

select finish();

rollback;
