-- Deploy ggircs-portal:table_form_result to pg
-- requires: schema_ggircs_portal
-- requires: table_form_json

BEGIN;

create table ggircs_portal.form_result (
  id serial not null,
  form_id int not null,
  user_id int not null,
  field varchar(10000),
  field_value varchar(100000)
);

create unique index form_result_id_uindex
	on ggircs_portal.form_result (id);

alter table ggircs_portal.form_result
	add constraint form_result_pk
		primary key (id);

comment on column ggircs_portal.form_result.id is 'Unique ID for the form';
comment on column ggircs_portal.form_result.form_id is 'The Unique ID of the form';
comment on column ggircs_portal.form_result.user_id is 'The Unique ID of the User';
comment on column ggircs_portal.form_result.field is 'The field id / slug';
comment on column ggircs_portal.form_result.field_value is 'The value of the field';

COMMIT;
