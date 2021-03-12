-- Deploy ggircs-portal:types/facility_application to pg

begin;

create type ggircs_portal.facility_application as (
  facility_id int,
  organisation_id int,
  application_id int,
  operator_name varchar(1000),
  facility_name varchar(1000),
  facility_type varchar(1000),
  facility_bcghgid varchar(1000),
  swrs_facility_id int,
  reporting_year int
);

comment on type ggircs_portal.facility_application is '
@primaryKey facility_id,reporting_year
@foreignKey (application_id) references ggircs_portal.application (id)
@foreignKey (facility_id) references ggircs_portal.facility (id)
@foreignKey (organisation_id) references ggircs_portal.organisation (id)
A composite type representing the association of a facility and its CIIP application for a given reporting year';

commit;
