-- Deploy ggircs-portal:table_organisation to pg
-- requires: schema_ggircs_portal

begin;


  create table ggircs_portal.organisation (
      id integer,
      report_id integer ,
      swrs_report_id integer ,
      swrs_organisation_id integer ,
      reporting_year varchar(1000),
      operator_name varchar(1000),
      operator_trade_name varchar(1000),
      duns varchar(1000),
      cra_business_number varchar(1000),
      operator_mailing_address varchar(1000),
      operator_city varchar(1000),
      operator_province varchar(1000),
      operator_postal_code varchar(1000),
      operator_country varchar(1000)
  );


  create unique index organisation_id_index
    on ggircs_portal.organisation (id);

  alter table ggircs_portal.organisation
    add constraint organisation_pk
      primary key (id);


    --Todo: refactor to add address table in CIIP

    comment on column ggircs_portal.organisation.id is 'unique if for the organisation';
    comment on column ggircs_portal.organisation.report_id is 'report id from swrs';
    comment on column ggircs_portal.organisation.swrs_report_id is 'swrs report id from swrs';
    comment on column ggircs_portal.organisation.swrs_organisation_id is 'swrs organisation id';
    comment on column ggircs_portal.organisation.reporting_year is 'the reporting year';
    comment on column ggircs_portal.organisation.operator_name is 'legal name of organisation';
    comment on column ggircs_portal.organisation.operator_trade_name is 'trade name of organisation';
    comment on column ggircs_portal.organisation.duns is 'duns number';
    comment on column ggircs_portal.organisation.cra_business_number is 'cra business number';
    comment on column ggircs_portal.organisation.operator_mailing_address is 'organisation mailing address';
    comment on column ggircs_portal.organisation.operator_city is 'organisation city';
    comment on column ggircs_portal.organisation.operator_province is 'organisation province';
    comment on column ggircs_portal.organisation.operator_postal_code is 'organisation postal code';
    comment on column ggircs_portal.organisation.operator_country is 'organisation country';


    insert into ggircs_portal.organisation (
      id,
      report_id,
      swrs_report_id,
      swrs_organisation_id,
      reporting_year,
      operator_name,
      operator_trade_name,
      duns,
      cra_business_number,
      operator_mailing_address,
      operator_city,
      operator_province,
      operator_postal_code,
      operator_country
    ) values (
      1,
      1192,
      15736,
      1039,
      '2018',
      'Canadian Natural Resources Limited',
      'Canadian Natural Resources Limited',
      '209137967',
      '121346357',
      'unit  2500, 855  2nd Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );

    insert into ggircs_portal.organisation (
      id,
      report_id,
      swrs_report_id,
      swrs_organisation_id,
      reporting_year,
      operator_name,
      operator_trade_name,
      duns,
      cra_business_number,
      operator_mailing_address,
      operator_city,
      operator_province,
      operator_postal_code,
      operator_country
    ) values (
      2,
      2218,
      16289,
      6465,
      '2018',
      'HARVEST OPERATIONS CORP.',
      'HARVEST OPERATIONS CORP.',
      '999999999',
      '863096665',
      '1500, 700 2 Street Southwest',
      'Calgary',
      'Alberta',
      't2p4j8',
      'Canada'
    );

commit;
