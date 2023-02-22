-- Deploy ggircs-portal:tables/fuel_emission_category to pg

begin;
create table ggircs_portal.fuel_emission_category (
  id integer primary key generated always as identity,
  fuel_id integer not null references ggircs_portal.fuel(id), 
  emission_category_id integer not null references ggircs_portal.emission_category(id)
);

create index fuel_emission_category_fuel_fkey on ggircs_portal.fuel_emission_category(fuel_id);
create index fuel_emission_category_emission_category_fkey on ggircs_portal.fuel_emission_category(emission_category_id);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'fuel_emission_category',
  add_create := true,
  add_update := true,
  add_delete := true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_emission_category', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'fuel_emission_category', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'fuel_emission_category', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_emission_category', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'fuel_emission_category', 'ciip_industry_user');



end
$grant$;

-- Enable row-level security
-- alter table ggircs_portal.incremental_fuel_charge_baseline enable row level security;

comment on table ggircs_portal.fuel_emission_category is 'Through table to connect fuel types and categories.';
comment on column ggircs_portal.fuel_emission_category.id is 'Unique ID for the fuel_emission_category table';
comment on column ggircs_portal.fuel_emission_category.fuel_id is 'Foreign key to the fuel table';
comment on column ggircs_portal.fuel_emission_category.emission_category_id is 'Foreign key to the emission category table.';
comment on column ggircs_portal.fuel_emission_category.created_at is 'Creation date of row';
comment on column ggircs_portal.fuel_emission_category.created_by is 'Creator of row';
comment on column ggircs_portal.fuel_emission_category.updated_at is 'Updated date of row';
comment on column ggircs_portal.fuel_emission_category.updated_by is 'Updator of row';
comment on column ggircs_portal.fuel_emission_category.deleted_at is 'Date of deletion';
comment on column ggircs_portal.fuel_emission_category.deleted_by is 'The user who deleted the row';

commit;

