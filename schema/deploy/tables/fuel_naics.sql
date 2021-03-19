-- Deploy ggircs-portal:tables/fuel_naics to pg
-- requires: tables/naics
-- requires: tables/fuel

begin;

create table ggircs_portal.fuel_naics (
  id integer primary key generated always as identity,
  fuel_id int not null references ggircs_portal.fuel(id),
  naics_id int not null references ggircs_portal.naics(id)
);

create unique index fuel_naics_fuel_id_naics_id_uindex on ggircs_portal.fuel_naics(fuel_id, naics_id);
create index fuel_naics_fuel_id_fkey on ggircs_portal.fuel_naics(fuel_id);
create index fuel_naics_naics_id_fkey on ggircs_portal.fuel_naics(naics_id);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'fuel_naics',
  add_create := true,
  add_update := true,
  add_delete := true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'fuel_naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'fuel_naics', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.fuel_naics is 'Defines which fuels can be reported in a facility with a given naics code. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.fuel_naics.id is 'Primary key for fuel_naics table';
comment on column ggircs_portal.fuel_naics.fuel_id is 'The id referencing the fuel table';
comment on column ggircs_portal.fuel_naics.naics_id is 'The id refrencing the naics table';
comment on column ggircs_portal.fuel_naics.created_at is 'The timestamp of when this fuel_naics row was created';
comment on column ggircs_portal.fuel_naics.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.fuel_naics.updated_at is 'The timestamp of when this fuel_naics row was last updated';
comment on column ggircs_portal.fuel_naics.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.fuel_naics.deleted_at is 'The timestamp of when this fuel_naics row was archived';
comment on column ggircs_portal.fuel_naics.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
