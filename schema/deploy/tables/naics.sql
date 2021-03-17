-- Deploy ggircs-portal:tables/naics to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.naics (
  naics_code integer not null primary key,
  naics_description varchar(10000) not null
);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'naics',
  add_create := true,
  add_update := true,
  add_delete := true);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'naics', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics', 'ciip_industry_user');

end
$grant$;

-- Enable row-level security
alter table ggircs_portal.naics enable row level security;

comment on table ggircs_portal.naics is 'Table contains naics codes & their descriptions. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics.naics_code is 'Primary key for naics table';
comment on column ggircs_portal.naics.naics_description is 'Unique step_name to be included in during an application review';

commit;
