-- Deploy ggircs-portal:types/search_certification_url_result to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.facility_search_result as (
    id integer,
    application_id integer,
    version_number integer,
    facility_name varchar(1000),
    operator_name varchar(1000),
    application_revision_status ggircs_portal.ciip_application_revision_status,
    certified_at timestamptz,
    certified_by varchar(1000),
    user_first_name varchar(1000),
    user_last_name varchar(1000)
);

comment on type ggircs_portal.facility_search_result is '@primaryKey (id)';
commit;
