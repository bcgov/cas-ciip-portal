-- Deploy ggircs-portal:table_organisation to pg
-- requires: schema_ggircs_portal

begin;


  create table ggircs_portal.organisation (
      id integer primary key generated always as identity,
      report_id integer ,
      swrs_report_id integer ,
      swrs_organisation_id integer ,
      reporting_year integer,
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

  create unique index organisation_swrs_report_id_uindex on ggircs_portal.organisation(swrs_report_id);
  --Todo: refactor to add address table in CIIP

  comment on table ggircs_portal.organisation is 'Table containing information on an organisaiton that has applied for CIIP';
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

commit;
