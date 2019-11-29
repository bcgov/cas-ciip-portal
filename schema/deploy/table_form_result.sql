-- Deploy ggircs-portal:table_form_result to pg
-- requires: schema_ggircs_portal
-- requires: table_form_json

begin;

create table ggircs_portal.form_result (
  id integer primary key generated always as identity,
  form_id int not null references ggircs_portal.form_json(id),
  application_id int not null references ggircs_portal.application(id),
  submission_date timestamp with time zone default now(),
  form_result jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_result
  for each row
  execute procedure ggircs_portal.update_timestamps();

comment on table ggircs_portal.form_result is 'Table containing CIIP application data received from a user';
comment on column ggircs_portal.form_result.id is 'Unique ID for the form';
comment on column ggircs_portal.form_result.form_id is 'The Unique ID of the form';
comment on column ggircs_portal.form_result.application_id is 'The Unique ID of the Application';
comment on column ggircs_portal.form_result.submission_date is 'The submission date of the Application';
comment on column ggircs_portal.form_result.form_result is 'JSON dump of form data';
comment on column ggircs_portal.form_result.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_result.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.updated_by is 'The person who updated the form';
comment on column ggircs_portal.form_result.deleted_at is 'The date the form was deleted';
comment on column ggircs_portal.form_result.deleted_by is 'The person who deleted the form';

commit;
