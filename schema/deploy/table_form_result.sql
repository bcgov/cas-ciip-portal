-- Deploy ggircs-portal:table_form_result to pg
-- requires: schema_ggircs_portal
-- requires: table_form_json

begin;

create table ggircs_portal.form_result (
  id serial not null,
  form_id int not null,
  user_id int not null,
  submission_date timestamp with time zone default now(),
  form_result jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000)
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_result
  for each row
  execute procedure ggircs_portal.update_timestamps();

create unique index form_result_id_uindex
  on ggircs_portal.form_result (id);

alter table ggircs_portal.form_result
  add constraint form_result_pk
    primary key (id);

comment on column ggircs_portal.form_result.id is 'Unique ID for the form';
comment on column ggircs_portal.form_result.form_id is 'The Unique ID of the form';
comment on column ggircs_portal.form_result.user_id is 'The Unique ID of the User';
comment on column ggircs_portal.form_result.form_result is 'JSON dump of form data';
comment on column ggircs_portal.form_result.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_result.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.updated_by is 'The person who updated the form';

commit;
