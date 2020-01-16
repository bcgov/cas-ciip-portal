set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

select has_function(
  'ggircs_portal', 'create_review_comment_mutation_chain', array['integer', 'integer', 'varchar(10000)', 'ggircs_portal.review_comment_type', 'integer'],
  'Function create_review_comment_mutation_chain should exist'
);

-- Insert organisation & facility test data
insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');

-- Call create application_mutation_chain to create a test application
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

select is_empty(
  $$
    select * from ggircs_portal.review_comment
    where application_id = (select id from ggircs_portal.facility where facility_name = 'test facility')
  $$,
  'No review comments are created on a new application by default'
);

select results_eq(
  $$
    select form_result_status from ggircs_portal.form_result_status
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1;
  $$,
  ARRAY['in review'::ggircs_portal.ciip_form_result_status],
  'form result status is "in review" by default'
);

-- create a comment with type 'required change'
select ggircs_portal.create_review_comment_mutation_chain((select max(id) from ggircs_portal.application), 1, 'test comment 1', 'requested change'::ggircs_portal.review_comment_type, 1);

select description from ggircs_portal.review_comment
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1 order by id desc limit 1;

select results_eq(
  $$
    select description from ggircs_portal.review_comment
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['test comment 1'::varchar(10000)],
  'comment with description "test comment 1" was created'
);

select results_eq(
  $$
    select form_result_status from ggircs_portal.form_result_status
    where application_id = (select max(id) from ggircs_portal.application) and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['changes requested'::ggircs_portal.ciip_form_result_status],
  'form result status is changed to "changes requested" by the mutation chain when comment_type is "requested change"'
);

-- create a comment with type 'internal'
select ggircs_portal.create_review_comment_mutation_chain((select max(id) from ggircs_portal.application), 1, 'test comment 2', 'internal'::ggircs_portal.review_comment_type, 1);

select results_eq(
  $$
    select description from ggircs_portal.review_comment
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['test comment 2'::varchar(10000)],
  'comment with description "test comment 2" was created'
);

select results_eq(
  $$
    select form_result_status from ggircs_portal.form_result_status
    where application_id = (select max(id) from ggircs_portal.application) and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['needs attention'::ggircs_portal.ciip_form_result_status],
  'form result status is changed to "needs attetion" by the mutation chain when comment_type is "internal"'
);

-- create a comment with type 'approval'
select ggircs_portal.create_review_comment_mutation_chain((select max(id) from ggircs_portal.application), 1, 'test comment 3', 'approval'::ggircs_portal.review_comment_type, 1);

select results_eq(
  $$
    select description from ggircs_portal.review_comment
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['test comment 3'::varchar(10000)],
  'comment with description "test comment 3" was created'
);

select results_eq(
  $$
    select form_result_status from ggircs_portal.form_result_status
    where application_id = (select max(id) from ggircs_portal.application) and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['approved'::ggircs_portal.ciip_form_result_status],
  'form result status is changed to "approved" by the mutation chain when comment_type is "approval"'
);

-- create a comment with type 'general'
select ggircs_portal.create_review_comment_mutation_chain((select max(id) from ggircs_portal.application), 1, 'test comment 4', 'general'::ggircs_portal.review_comment_type, 1);

select results_eq(
  $$
    select description from ggircs_portal.review_comment
    where application_id = (select max(id) from ggircs_portal.application)
    and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['test comment 4'::varchar(10000)],
  'comment with description "test comment 4" was created'
);

select results_eq(
  $$
    select form_result_status from ggircs_portal.form_result_status
    where application_id = (select max(id) from ggircs_portal.application) and form_id = 1 order by id desc limit 1;
  $$,
  ARRAY['approved'::ggircs_portal.ciip_form_result_status],
  'form result status is not changed by a comment with type "general"'
);

select finish();

rollback;
