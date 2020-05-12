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
      facility_name varchar(1000),
      facility_type varchar(1000),
      bcghgid varchar(1000)
  );

  create unique index facility_swrs_report_id_uindex on ggircs_portal.facility(swrs_report_id);
  create index facility_organisation_id_foreign_key on ggircs_portal.facility(organisation_id);

do
  $grant$
    begin
      -- Grant ciip_administrator permissions
      perform ggircs_portal_private.grant_permissions('select', 'facility', 'ciip_administrator');
      perform ggircs_portal_private.grant_permissions('insert', 'facility', 'ciip_administrator');
      perform ggircs_portal_private.grant_permissions('update', 'facility', 'ciip_administrator');

      -- Grant ciip_analyst permissions
      perform ggircs_portal_private.grant_permissions('select', 'facility', 'ciip_analyst');
      perform ggircs_portal_private.grant_permissions('insert', 'facility', 'ciip_analyst');
      perform ggircs_portal_private.grant_permissions('update', 'facility', 'ciip_analyst');

      -- Grant ciip_industry_user permissions
      perform ggircs_portal_private.grant_permissions('select', 'facility', 'ciip_industry_user');
      perform ggircs_portal_private.grant_permissions('insert', 'facility', 'ciip_industry_user');

      -- Grant ciip_guest permissions
      -- ?
    end
  $grant$;

-- Enable row-level security
alter table ggircs_portal.facility enable row level security;


  comment on table ggircs_portal.facility is 'Table containing information on an facility that has applied for CIIP';
  comment on column ggircs_portal.facility.id is 'unique id for the facility';
  comment on column ggircs_portal.facility.organisation_id is 'the id of the organization responsible for that facility';
  comment on column ggircs_portal.facility.report_id is 'report id from swrs';
  comment on column ggircs_portal.facility.swrs_report_id is 'swrs report id from swrs';
  comment on column ggircs_portal.facility.swrs_facility_id is 'swrs facility id from swrs';
  comment on column ggircs_portal.facility.swrs_organisation_id is 'swrs organisation id';
  comment on column ggircs_portal.facility.facility_name is 'the facility name';
  comment on column ggircs_portal.facility.facility_type is 'type of facility based on emission quantity';
  comment on column ggircs_portal.facility.bcghgid is 'CAS internal identifier';

commit;
