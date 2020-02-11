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

  do
  $grant$
  begin
    -- Grant ciip_administrator permissions
    perform ggircs_portal_private.grant_permissions('select', 'organisation', 'ciip_administrator');
    perform ggircs_portal_private.grant_permissions('insert', 'organisation', 'ciip_administrator');
    perform ggircs_portal_private.grant_permissions('update', 'organisation', 'ciip_administrator');

    -- Grant ciip_analyst permissions
    perform ggircs_portal_private.grant_permissions('select', 'organisation', 'ciip_analyst');
    perform ggircs_portal_private.grant_permissions('insert', 'organisation', 'ciip_analyst');
    perform ggircs_portal_private.grant_permissions('update', 'organisation', 'ciip_analyst');

    -- Grant ciip_industry_user permissions
    perform ggircs_portal_private.grant_permissions('select', 'organisation', 'ciip_industry_user');
    perform ggircs_portal_private.grant_permissions('insert', 'organisation', 'ciip_industry_user');

    -- Grant ciip_guest permissions
    -- ?
  end
  $grant$;

  -- Enable row-level security
  alter table ggircs_portal.organisation enable row level security;

  do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_organisation', 'organisation', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_organisation', 'organisation', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_organisation', 'organisation', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_organisation', 'organisation', 'select', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_organisation', 'organisation', 'insert', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_update_organisation', 'organisation', 'update', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_organisation', 'organisation', 'select', 'ciip_industry_user', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_organisation', 'organisation', 'insert', 'ciip_industry_user', 'true');

  end
  $policy$;

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
