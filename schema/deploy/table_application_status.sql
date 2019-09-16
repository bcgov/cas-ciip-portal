-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result

BEGIN;

create table ggircs_portal.application_status (
    id int,
    application_status varchar(1000)
);

comment on table ggircs_portal.application_status is 'The application status data';
comment on column ggircs_portal.application_status.id is 'The application id used for reference and join';
comment on column ggircs_portal.application_status.application_status is 'The application status';

COMMIT;
