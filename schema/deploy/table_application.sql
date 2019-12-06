-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal

-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result
-- requires: table_reporting_year

begin;

create table ggircs_portal.application (
    id integer primary key generated always as identity,
    facility_id integer not null references ggircs_portal.facility(id),
    reporting_year int references ggircs_portal.reporting_year(reporting_year),
    certification_signature bytea,
    certified_by_user integer references ggircs_portal.ciip_user(id)
);

comment on table ggircs_portal.application is 'The application data';
comment on column ggircs_portal.application.id is 'The application id used for reference and join';
comment on column ggircs_portal.application.facility_id is 'The foreign key to ggircs_portal.facility, references id';
comment on column ggircs_portal.application.reporting_year is 'The foreign key to ggircs_portal.reporting_year, references reporting_year';
comment on column ggircs_portal.application.certification_signature is 'The base64 representation of the certifier''s signature';
comment on column ggircs_portal.application.certified_by_user is 'The certifier''s user id, references ciip_user';

commit;
