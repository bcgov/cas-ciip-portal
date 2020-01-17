set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(23);

-- Table exists
select has_table(
  'ggircs_portal', 'review_comment',
  'ggircs_portal.review_comment should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'review_comment', 'id',
  'review_comment has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'review_comment', 'application_id',
  'review_comment has foreign key on application_id referencing ggircs_portal.application'
);

select col_is_fk(
  'ggircs_portal', 'review_comment', 'form_id',
  'review_comment has foreign key on form_id referencing ggircs_portal.form_json'
);

select has_index(
  'ggircs_portal', 'review_comment', 'ggircs_portal_review_comment_application_foreign_key',
  'review_comment has an index on its foreign key (application_id)'
);

select has_index(
  'ggircs_portal', 'review_comment', 'ggircs_portal_review_comment_form_json_foreign_key',
  'review_comment has an index on its foreign key (form_id)'
);

-- Columns
select columns_are('ggircs_portal'::name, 'review_comment'::name, array[
  'id'::name,
  'application_id'::name,
  'form_id'::name,
  'description'::name,
  'comment_type'::name,
  'resolved'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name
]);

select col_type_is('ggircs_portal', 'review_comment', 'id', 'integer', 'id column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'application_id', 'integer', 'application_id column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'description', 'character varying(100000)', 'review_comment column should be type varchar(10000)');
select col_type_is('ggircs_portal', 'review_comment', 'comment_type', 'ggircs_portal.review_comment_type', 'comment_type column should be type review_comment_type');
select col_type_is('ggircs_portal', 'review_comment', 'created_at', 'timestamp with time zone', 'created_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'created_by', 'integer', 'created_by column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'updated_at', 'timestamp with time zone', 'updated_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'updated_by', 'integer', 'updated_by column should be type integer');
select col_type_is('ggircs_portal', 'review_comment', 'deleted_at', 'timestamp with time zone', 'deleted_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'review_comment', 'deleted_by', 'integer', 'deleted_by column should be type integer');

select col_not_null('ggircs_portal', 'review_comment', 'id', 'id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'application_id', 'application_id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'form_id', 'form_id column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'created_at', 'created_at column should not be nullable');
select col_not_null('ggircs_portal', 'review_comment', 'updated_at', 'updated_at column should not be nullable');

-- Triggers
select has_trigger('ggircs_portal', 'review_comment', '_100_timestamps', 'review_comment has update timestamps trigger');

select finish();
rollback;
