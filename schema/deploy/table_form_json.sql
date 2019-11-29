-- Deploy ggircs-portal:table_form_json to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.form_json (
  id integer primary key generated always as identity,
  name varchar(1000) not null,
  slug varchar(1000) not null,
  short_name varchar(1000) not null,
  description varchar(10000) not null,
  form_json jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user,
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

comment on table ggircs_portal.form_json is 'Table containing the structure of each form to be filled out when applying for CIIP';
comment on column ggircs_portal.form_json.id is 'Unique ID for the form';
comment on column ggircs_portal.form_json.name is 'Name for the form';
comment on column ggircs_portal.form_json.slug is 'slug for the use as classname';
comment on column ggircs_portal.form_json.short_name is 'short name for the form';
comment on column ggircs_portal.form_json.description is 'description for the form';
comment on column ggircs_portal.form_json.form_json is 'The JSON object that creates the form';
comment on column ggircs_portal.form_json.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_json.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_json.updated_by is 'The person who updated the form';
comment on column ggircs_portal.form_json.prepopulate_from_ciip is 'Whether the form is initialized with data submitted in the previous year''s application';
comment on column ggircs_portal.form_json.prepopulate_from_swrs is 'Whether the form is initialized with data submitted in the previous year''s application';
comment on column ggircs_portal.form_json.form_result_init_function is 'The function used for init';
comment on column ggircs_portal.form_json.deleted_at is 'The date the form was deleted';
comment on column ggircs_portal.form_json.deleted_by is 'The person who deleted the form';

commit;
