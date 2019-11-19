-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal

-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result
-- requires: table_reporting_year

begin;

create table ggircs_portal.application (
    id integer primary key generated always as identity,
    facility_id integer not null references ggircs_portal.facility(id)
);

comment on table ggircs_portal.application is 'The application data';
comment on column ggircs_portal.application.id is 'The application id used for reference and join';
comment on column ggircs_portal.application.facility_id is 'The foreign key to ggircs_portal.facility, references id';

commit;
