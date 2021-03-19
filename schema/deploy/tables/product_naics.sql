-- Deploy ggircs-portal:tables/product-naics to pg
-- requires: tables/naics
-- requires: tables/product

begin;

create table ggircs_portal.product_naics (
  id integer primary key generated always as identity,
  product_id int not null references ggircs_portal.product(id),
  naics_id int not null references ggircs_portal.naics(id),
  is_mandatory boolean not null default false
);

create unique index product_naics_product_id_naics_id_uindex on ggircs_portal.product_naics(product_id, naics_id);
create index product_naics_product_id_fkey on ggircs_portal.product_naics(product_id);
create index product_naics_naics_id_fkey on ggircs_portal.product_naics(naics_id);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'product_naics',
  add_create := true,
  add_update := true,
  add_delete := true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'product_naics', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'product_naics', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.product_naics is 'Defines which products can be reported in a facility with a given naics code. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.product_naics.id is 'Primary key for product_naics table';
comment on column ggircs_portal.product_naics.product_id is 'The id referencing the product table';
comment on column ggircs_portal.product_naics.naics_id is 'The id refrencing the naics table';
comment on column ggircs_portal.product_naics.is_mandatory is 'Defines whether the related product must be reported by an operator classified under the related naics code';
comment on column ggircs_portal.product_naics.created_at is 'The timestamp of when this product_naics row was created';
comment on column ggircs_portal.product_naics.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.product_naics.updated_at is 'The timestamp of when this product_naics row was last updated';
comment on column ggircs_portal.product_naics.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.product_naics.deleted_at is 'The timestamp of when this product_naics row was archived';
comment on column ggircs_portal.product_naics.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
