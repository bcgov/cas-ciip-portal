set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(23);

-- Table exists
select has_table(
  'ggircs_portal', 'application_revision_status',
  'ggircs_portal.application_revision_status should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'application_revision_status', 'id',
  'application_revision_status has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'application_revision_status', ARRAY['application_id', 'version_number'],
  'application_revision_status has a composite foreign key on application_id and version_number'
);

select has_index(
  'ggircs_portal', 'application_revision_status', 'ggircs_portal_application_revision_status_foreign_key',
  'application_revision_status has an index on its foreign key (application_id, version_number)'
);

-- Columns
select columns_are('ggircs_portal'::name, 'application_revision_status'::name, array[
  'id'::name,
  'application_id'::name,
  'version_number'::name,
  'application_revision_status'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name
]);

select col_type_is('ggircs_portal', 'application_revision_status', 'id', 'integer', 'id column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'application_id', 'integer', 'application_id column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'version_number', 'integer', 'version_number column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'application_revision_status', 'ggircs_portal.ciip_application_revision_status', 'application_revision_status column should be type ciip_application_revision_status');
select col_type_is('ggircs_portal', 'application_revision_status', 'created_at', 'timestamp with time zone', 'created_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'created_by', 'integer', 'created_by column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'updated_at', 'timestamp with time zone', 'updated_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'updated_by', 'integer', 'updated_by column should be type integer');
select col_type_is('ggircs_portal', 'application_revision_status', 'deleted_at', 'timestamp with time zone', 'deleted_at column should be type timestamptz');
select col_type_is('ggircs_portal', 'application_revision_status', 'deleted_by', 'integer', 'deleted_by column should be type integer');

select col_not_null('ggircs_portal', 'application_revision_status', 'id', 'id column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'application_id', 'application_id column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'version_number', 'version_number column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'created_at', 'created_at column should not be nullable');
select col_not_null('ggircs_portal', 'application_revision_status', 'updated_at', 'updated_at column should not be nullable');

-- Triggers
select has_trigger('ggircs_portal', 'application_revision_status', '_ensure_window_open', 'application_revision_status has window open trigger');
select has_trigger('ggircs_portal', 'application_revision_status', '_100_timestamps', 'application_revision_status has update timestamps trigger');
select has_trigger('ggircs_portal', 'application_revision_status', '_checksum_form_results', 'application_revision_status has checksum form results trigger');



select finish();
rollback;
