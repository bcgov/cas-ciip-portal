-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal

-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result

begin;

create table ggircs_portal.application (
    id serial primary key,
    facility_id integer not null references ggircs_portal.facility(id)
);

create unique index application_id_uindex
	on ggircs_portal.application (id);

comment on table ggircs_portal.application is 'The application data';
comment on column ggircs_portal.application.id is 'The application id used for reference and join';

commit;
