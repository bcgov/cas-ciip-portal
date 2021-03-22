-- Deploy ggircs-portal:tables/product-naics to pg
-- requires: tables/naics
-- requires: tables/product

begin;

create table ggircs_portal.product_naics_code (
  id integer primary key generated always as identity,
  product_id int not null references ggircs_portal.product(id),
  naics_code_id int not null references ggircs_portal.naics_code(id),
  is_mandatory boolean not null default false
);

create unique index product_naics_code_product_id_naics_code_id_uindex on ggircs_portal.product_naics_code(product_id, naics_code_id);
create index product_naics_code_product_id_fkey on ggircs_portal.product_naics_code(product_id);
create index product_naics_code_naics_code_id_fkey on ggircs_portal.product_naics_code(naics_code_id);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'product_naics_code',
  add_create := true,
  add_update := true,
  add_delete := true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'product_naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'product_naics_code', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics_code', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product_naics_code', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.product_naics_code is 'Defines which products can be reported in a facility with a given naics code. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.product_naics_code.id is 'Primary key for product_naics_code table';
comment on column ggircs_portal.product_naics_code.product_id is 'The id referencing the product table';
comment on column ggircs_portal.product_naics_code.naics_code_id is 'The id refrencing the naics_code table';
comment on column ggircs_portal.product_naics_code.is_mandatory is 'Defines whether the related product must be reported by an operator classified under the related naics code';
comment on column ggircs_portal.product_naics_code.created_at is 'The timestamp of when this product_naics_code row was created';
comment on column ggircs_portal.product_naics_code.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.product_naics_code.updated_at is 'The timestamp of when this product_naics_code row was last updated';
comment on column ggircs_portal.product_naics_code.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.product_naics_code.deleted_at is 'The timestamp of when this product_naics_code row was archived';
comment on column ggircs_portal.product_naics_code.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

commit;
