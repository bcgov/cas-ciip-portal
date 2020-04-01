-- Deploy ggircs-portal:product to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.product (
  id integer primary key generated always as identity,
  name varchar(1000) not null,
  description varchar(10000),
  units varchar(1000),
  state varchar(1000),
  parent integer ARRAY,
  requires_emission_allocation boolean not null default false,
  is_ciip_product boolean not null default true,
  is_production_amount_optional boolean default false,
  add_purchased_electricity_emissions boolean,
  subtract_exported_electricity_emissions boolean,
  add_purchased_heat_emissions boolean,
  subtract_exported_heat_emissions boolean,
  subtract_generated_electricity_emissions boolean,
  subtract_generated_heat_emissions boolean,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.product
  for each row
  execute procedure ggircs_portal.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'product', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'product', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'product', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'product', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.product enable row level security;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_product', 'product', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_product', 'product', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_product', 'product', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_product', 'product', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_product', 'product', 'select', 'ciip_industry_user', 'true');

end
$policy$;

comment on table ggircs_portal.product is 'Table containing the information for a CIIP product';
comment on column ggircs_portal.product.id is 'Unique ID for the product';
comment on column ggircs_portal.product.name is 'The name of the product';
comment on column ggircs_portal.product.description is 'The description of the product';
comment on column ggircs_portal.product.units is 'The unit of measure for the product';
comment on column ggircs_portal.product.requires_emission_allocation is 'Boolean value indicates if the product requires allocation of emissions';
comment on column ggircs_portal.product.is_ciip_product is 'Boolean value indicates if the product is benchmarked and has an associated incentive';
comment on column ggircs_portal.product.is_ciip_product is 'Boolean value indicates if reporting the production amount is optional for a non-ciip product';
comment on column ggircs_portal.product.add_purchased_electricity_emissions is  'Boolean value indicates if purchased electricity emissions should be added to the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.subtract_exported_electricity_emissions is  'Boolean value indicates if exported electricity emissions should be subtracted from the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.add_purchased_heat_emissions is  'Boolean value indicates if purchased heat emissions should be added to the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.subtract_exported_heat_emissions is  'Boolean value indicates if exported heat emissions should be subtracted from the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.subtract_generated_electricity_emissions is  'Boolean value indicates if generated electricity emissions should be subtracted from the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.subtract_generated_heat_emissions is  'Boolean value indicates if generated heat emissions should be subtracted from the facility emissions when calculating the product emission intensity (applies only to products where requires_emission_allocation is false)';
comment on column ggircs_portal.product.state is 'The current state of the product within the lifecycle (created, split, merged, redefined, archived, unarchived)';
comment on column ggircs_portal.product.parent is 'The parent ID(s) (previous state) of the product';
comment on column ggircs_portal.product.created_at is 'Creation date of row';
comment on column ggircs_portal.product.created_by is 'Creator of row';
comment on column ggircs_portal.product.updated_at is 'Updated date of row';
comment on column ggircs_portal.product.updated_by is 'Updator of row';
comment on column ggircs_portal.product.deleted_at is 'Date of deletion';
comment on column ggircs_portal.product.deleted_by is 'The user who deleted the row';

commit;
