set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'form_result_internal_general_comments', array['ggircs_portal.form_result'],
  'Function form_result_internal_general_comments should exist'
);

alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');

select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type, resolved)
values ((select max(id) from ggircs_portal.application), 1, 'internal', 'internal'::ggircs_portal.review_comment_type, false);

insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type, resolved)
values ((select max(id) from ggircs_portal.application), 1, 'general', 'general'::ggircs_portal.review_comment_type, false);

insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type, resolved)
values ((select max(id) from ggircs_portal.application), 1, 'change', 'requested change'::ggircs_portal.review_comment_type, false);

select set_eq(
  $$
    with record as (select row( form_result.*)::ggircs_portal.form_result from ggircs_portal.form_result where application_id = (select max(id) from ggircs_portal.application) and version_number = 1 and form_id = 1)
    select description from ggircs_portal.form_result_internal_general_comments((select * from record));
  $$,
  ARRAY['internal'::varchar(100000), 'general'::varchar(100000)],
  'form_result_internal_general_comments returns general and internal type comments'
);

select is_empty(
  $$
    with record as (select row( form_result.*)::ggircs_portal.form_result from ggircs_portal.form_result where application_id = (select max(id) from ggircs_portal.application) and version_number = 1 and form_id = 1)
    select * from ggircs_portal.form_result_internal_general_comments((select * from record)) where comment_type = 'requested change'::ggircs_portal.review_comment_type;
  $$,
  'form_result_internal_general_comments does not return requested change type comments'
);


select finish();

rollback;
