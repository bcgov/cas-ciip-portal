-- Deploy ggircs-portal:types/search_certification_url_result to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.search_certification_url_result as (
    id varchar(1000),
    application_id integer,
    version_number integer,
    certified_at timestamptz,
    certifier_email varchar(1000),
    facility_name varchar(1000),
    operator_name varchar(1000),
    application_revision_status ggircs_portal.ciip_application_revision_status,
    certified_by_first_name varchar(1000),
    certified_by_last_name varchar(1000)
);

comment on type ggircs_portal.search_certification_url_result is '@primaryKey (id)';
commit;
