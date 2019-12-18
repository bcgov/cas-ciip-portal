-- Deploy ggircs-portal:type_facility_search_result to pg
-- requires: schema_ggircs_portal
-- requires: table_facility
-- requires: table_application
-- requires: type_ciip_application_revision_status

begin;

create type ggircs_portal.facility_search_result as (
    id integer,
    application_id integer,
    facility_id integer,
    facility_name varchar(1000),
    facility_mailing_address varchar(1000),
    facility_city varchar(1000),
    facility_postal_code varchar(1000),
    reporting_year varchar(1000),
    application_revision_status ggircs_portal.ciip_application_revision_status,
    organisation_name varchar(1000)
);

comment on type ggircs_portal.facility_search_result is '@primaryKey (facility_id, application_id)
@foreignKey (application_id) references ggircs_portal.application(id)
@foreignKey (facility_id) references ggircs_portal.facility(id)';
commit;
