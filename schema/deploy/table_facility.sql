-- Deploy ggircs-portal:table_facility to pg
-- requires: schema_ggircs_portal

begin;

  create table ggircs_portal.facility (
      id integer not null,
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


  create unique index facility_id_index
    on ggircs_portal.facility (id);

  alter table ggircs_portal.facility
    add constraint facility_pk
      primary key (id);


  --Todo: refactor to add address table in CIIP

    comment on column ggircs_portal.facility.id is 'unique id for the facility';
    comment on column ggircs_portal.facility.organisation_id is 'the id of the organization responsible for that facility';
    comment on column ggircs_portal.facility.report_id is 'report id from swrs';
    comment on column ggircs_portal.facility.swrs_report_id is 'swrs report id from swrs';
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




    insert into ggircs_portal.facility (
      id,
      organisation_id,
      report_id,
      swrs_report_id,
      swrs_facility_id ,
      swrs_organisation_id,
      reporting_year,
      facility_name,
      facility_type ,
      bcghgid,
      naics_code,
      naics_classification,
      latitude,
      longitude,
      facility_mailing_address,
      facility_city,
      facility_province,
      facility_postal_code,
      facility_country
    ) values (
      1,
      1,
      1192,
      15736,
      1766,
      1039,
      '2018',
      'Stoddart Comp Stn 14-34',
      'IF_b',
      '12111130338',
      211110,
      'Oil and gas extraction (except oil sands)',
      '56.41986',
      '-121.07136',
      '2500, 855 42nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    ), (
      2,
      1,
      4000,
      15736,
      1767,
      1039,
      '2018',
      'Stoddart Subsidiary',
      'IF_b',
      '12111130339',
      211110,
      'Oil and gas extraction (except oil sands)',
      '56.41986',
      '-121.07136',
      '2500, 855 42nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    ), (
      3,
      2,
      2218,
      16289,
      2251,
      6465,
      '2018',
      'Aggregated Harvest Facilities',
      'IF_b',
      '12111130397',
      211113,
      'Conventional Oil and Gas Extraction',
      '56.41986',
      '-121.07136',
      '2100, 330 5 Avenue',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );



commit;
