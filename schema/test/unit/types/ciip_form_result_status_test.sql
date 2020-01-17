set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_type(
  'ggircs_portal', 'ciip_form_result_status', 'Type review_comment_type should exist'
);

select has_enum(
  'ggircs_portal', 'ciip_form_result_status', 'Type review_comment_type should be an enum'
);

select enum_has_labels(
  'ggircs_portal',
  'ciip_form_result_status',
  ARRAY['approved', 'in review', 'changes requested', 'needs attention'],
  'Type review_comment_type should have enum labels {approved, in review, changes requested, needs attention}'
);

select finish();

rollback;
