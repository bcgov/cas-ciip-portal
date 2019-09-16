-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result

BEGIN;

create table ggircs_portal.application_status (
    id serial not null,
    application_status varchar(1000),
    updated_by varchar(1000),
    updated_at varchar(1000),
    form_json_id int not null references ggircs_portal.form_json(id)
);

create unique index application_status_id_uindex
	on ggircs_portal.application_status (id);

alter table ggircs_portal.application_status
	add constraint application_status_pk
		primary key (id);

comment on table ggircs_portal.application_status is 'The application status data';
comment on column ggircs_portal.application_status.id is 'The application id used for reference and join';
comment on column ggircs_portal.application_status.application_status is 'The application status';
comment on column ggircs_portal.application_status.updated_at is 'The date the application status was updated';
comment on column ggircs_portal.application_status.updated_by is 'The person who updated the application status';
comment on column ggircs_portal.application_status.updated_by is 'The foreign key to the corresponding form_json';

COMMIT;
