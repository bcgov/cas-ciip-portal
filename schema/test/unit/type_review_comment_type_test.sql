set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_type(
  'ggircs_portal', 'review_comment_type', 'Type review_comment_type should exist'
);

select has_enum(
  'ggircs_portal', 'review_comment_type', 'Type review_comment_type should be an enum'
);

select enum_has_labels(
  'ggircs_portal',
  'review_comment_type',
  ARRAY['approval', 'general', 'internal', 'requested change'],
  'Type review_comment_type should have enum labels {approval, general, internal, requested change}'
);

select finish();

rollback;
