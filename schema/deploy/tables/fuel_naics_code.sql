-- Deploy ggircs-portal:tables/fuel_naics_code to pg
-- requires: tables/naics
-- requires: tables/fuel

begin;

create table ggircs_portal.fuel_naics_code (
  id integer primary key generated always as identity,
  fuel_id int not null references ggircs_portal.fuel(id),
  naics_code_id int not null references ggircs_portal.naics_code(id)
);

create unique index fuel_naics_code_fuel_id_naics_code_id_uindex on ggircs_portal.fuel_naics_code(fuel_id, naics_code_id);
create index fuel_naics_code_fuel_id_fkey on ggircs_portal.fuel_naics_code(fuel_id);
create index fuel_naics_code_naics_code_id_fkey on ggircs_portal.fuel_naics_code(naics_code_id);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'fuel_naics_code',
  add_create := true,
  add_update := true,
  add_delete := true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'fuel_naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'fuel_naics_code', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics_code', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_naics_code', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.fuel_naics_code is 'Defines which fuels can be reported in a facility with a given naics code. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.fuel_naics_code.id is 'Primary key for fuel_naics_code table';
comment on column ggircs_portal.fuel_naics_code.fuel_id is 'The id referencing the fuel table';
comment on column ggircs_portal.fuel_naics_code.naics_code_id is 'The id refrencing the naics table';
comment on column ggircs_portal.fuel_naics_code.created_at is 'The timestamp of when this fuel_naics_code row was created';
comment on column ggircs_portal.fuel_naics_code.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.fuel_naics_code.updated_at is 'The timestamp of when this fuel_naics_code row was last updated';
comment on column ggircs_portal.fuel_naics_code.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.fuel_naics_code.deleted_at is 'The timestamp of when this fuel_naics_code row was archived';
comment on column ggircs_portal.fuel_naics_code.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
