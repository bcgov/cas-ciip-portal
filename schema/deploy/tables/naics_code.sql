-- Deploy ggircs-portal:tables/naics_code to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.naics_code (
  id integer primary key generated always as identity,
  naics_code varchar(1000) not null,
  ciip_sector varchar(1000),
  naics_description varchar(10000) not null
);

create unique index naics_naics_code_uindex on ggircs_portal.naics_code(naics_code);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'naics_code',
  add_create := true,
  add_update := true,
  add_delete := true);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'naics_code', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.naics_code is 'Table contains naics codes & their descriptions. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics_code.id is 'Primary key for naics_code table';
comment on column ggircs_portal.naics_code.naics_code is 'The naics_code, NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics_code.ciip_sector is 'The sector this naics code belongs to according to the CleanBC Industrial Incentive Program';
comment on column ggircs_portal.naics_code.naics_description is 'The plain text description of the NAICS classification';
comment on column ggircs_portal.naics_code.created_at is 'The timestamp of when this naics_code row was created';
comment on column ggircs_portal.naics_code.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.naics_code.updated_at is 'The timestamp of when this naics_code row was last updated';
comment on column ggircs_portal.naics_code.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.naics_code.deleted_at is 'The timestamp of when this naics_code row was archived';
comment on column ggircs_portal.naics_code.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
