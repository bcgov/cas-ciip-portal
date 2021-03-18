-- Deploy ggircs-portal:tables/naics to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.naics (
  id integer primary key generated always as identity,
  naics_code varchar(1000) not null,
  naics_description varchar(10000) not null
);

create unique index naics_naics_code_uindex on ggircs_portal.naics(naics_code);

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

comment on table ggircs_portal.naics is 'Table contains naics codes & their descriptions. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics.id is 'Primary key for naics table';
comment on column ggircs_portal.naics.naics_code is 'The naics_code, NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics.naics_description is 'The plain text description of the NAICS classification';
comment on column ggircs_portal.naics.created_at is 'The timestamp of when this naics row was created';
comment on column ggircs_portal.naics.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.naics.updated_at is 'The timestamp of when this naics row was last updated';
comment on column ggircs_portal.naics.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.naics.deleted_at is 'The timestamp of when this naics row was archived';
comment on column ggircs_portal.naics.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
