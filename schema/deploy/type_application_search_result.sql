-- Deploy ggircs-portal:type_application_search_result to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.application_search_result as (
  application_id int,
  operator_name varchar(1000),
  facility_name varchar(1000),
  reporting_year int,
  bcghgid varchar(1000),
  submission_date timestamp with time zone,
  application_revision_status ggircs_portal.ciip_application_revision_status);

comment on type ggircs_portal.application_search_result is E'@primaryKey id\n@foreignKey (application_id) references ggircs_portal.application (id)';

commit;
