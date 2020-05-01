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
    facility_type varchar(1000),
    facility_bcghgid varchar(1000),
    last_swrs_reporting_year integer,
    application_revision_status ggircs_portal.ciip_application_revision_status,
    organisation_name varchar(1000),
    total_facility_count integer
);

comment on type ggircs_portal.facility_search_result is '@primaryKey (facility_id, application_id)
@foreignKey (application_id) references ggircs_portal.application(id)
@foreignKey (facility_id) references ggircs_portal.facility(id)';
commit;
