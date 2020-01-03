-- Deploy ggircs-portal:table_facility to pg
-- requires: schema_ggircs_portal

begin;

  create table ggircs_portal.facility (
      id integer primary key generated always as identity,
      organisation_id integer not null references ggircs_portal.organisation(id),
      report_id integer ,
      swrs_report_id integer ,
      swrs_facility_id integer ,
      swrs_organisation_id integer ,
      reporting_year varchar(1000),
      facility_name varchar(1000),
      facility_type varchar(1000),
      bcghgid varchar(1000),
      naics_code integer,
      naics_classification varchar(1000),
      latitude numeric,
      longitude numeric,
      facility_mailing_address varchar(1000),
      facility_city varchar(1000),
      facility_province varchar(1000),
      facility_postal_code varchar(1000),
      facility_country varchar(1000)
  );

  --Todo: refactor to add address table in CIIP
  create unique index facility_swrs_report_id_uindex on ggircs_portal.facility(swrs_report_id);

    comment on table ggircs_portal.facility is 'Table containing information on an facility that has applied for CIIP';
    comment on column ggircs_portal.facility.id is 'unique id for the facility';
    comment on column ggircs_portal.facility.organisation_id is 'the id of the organization responsible for that facility';
    comment on column ggircs_portal.facility.report_id is 'report id from swrs';
    comment on column ggircs_portal.facility.swrs_report_id is 'swrs report id from swrs';
    comment on column ggircs_portal.facility.swrs_facility_id is 'swrs facility id from swrs';
    comment on column ggircs_portal.facility.swrs_organisation_id is 'swrs organisation id';
    comment on column ggircs_portal.facility.reporting_year is 'the reporting year';
    comment on column ggircs_portal.facility.facility_name is 'the facility name';
    comment on column ggircs_portal.facility.facility_type is 'type of facility based on emission quantity';
    comment on column ggircs_portal.facility.bcghgid is 'CAS internal identifier';
    comment on column ggircs_portal.facility.naics_code is 'The NAICS code / sector';
    comment on column ggircs_portal.facility.naics_classification is 'description of the naics code';
    comment on column ggircs_portal.facility.latitude is 'facility latitude';
    comment on column ggircs_portal.facility.longitude is 'facility longitude';
    comment on column ggircs_portal.facility.facility_mailing_address is 'facility mailing address';
    comment on column ggircs_portal.facility.facility_city is 'facility city';
    comment on column ggircs_portal.facility.facility_province is 'facility province';
    comment on column ggircs_portal.facility.facility_postal_code is 'facility postal code';
    comment on column ggircs_portal.facility.facility_country is 'facility country';

commit;
