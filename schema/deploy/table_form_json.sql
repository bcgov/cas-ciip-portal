-- Deploy ggircs-portal:table_form_json to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.form_json (
  id integer primary key generated always as identity,
  name varchar(1000) not null,
  form_json jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  prepopulate_from_ciip boolean not null,
  prepopulate_from_swrs boolean not null,
  form_result_init_function varchar(1000)
  --todo: add versioning columns
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_json
  for each row
  execute procedure ggircs_portal.update_timestamps();

create unique index form_json_id_uindex
  on ggircs_portal.form_json (id);

comment on column ggircs_portal.form_json.id is 'Unique ID for the form';
comment on column ggircs_portal.form_json.name is 'Name for the form';
comment on column ggircs_portal.form_json.form_json is 'The JSON object that creates the form';
comment on column ggircs_portal.form_json.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_json.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.updated_by is 'The person who updated the form';
comment on column ggircs_portal.form_json.prepopulate_from_ciip is 'Whether the form is initialized with data submitted in the previous year''s application';
comment on column ggircs_portal.form_json.prepopulate_from_swrs is 'Whether the form is initialized with data submitted in the previous year''s application';
commit;
