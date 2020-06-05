-- Deploy ggircs-portal:tables/product-link to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.product_link (
  id integer primary key generated always as identity,
  product_id integer not null references ggircs_portal.product(id),
  linked_product_id integer not null references ggircs_portal.product(id)
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
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'product_link', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'product_link', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'product_link', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product-link', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'product-link', 'ciip_industry_user');

end
$grant$;

-- Enable row-level security
alter table ggircs_portal.product_link enable row level security;

comment on table ggircs_portal.product is 'Table containing the information for the links between CIIP products. A link from product_id -> linked_product_id requires linked_product_id to be reported if product_id is reported';
comment on column ggircs_portal.product.id is 'Unique ID for the product link';
comment on column ggircs_portal.product.product_id is 'The id of the product the link is created on';
comment on column ggircs_portal.product.linked_product_id is 'The id of the product the linked required by product_id to also be reported';
comment on column ggircs_portal.product.created_at is 'Creation date of row';
comment on column ggircs_portal.product.created_by is 'Creator of row';
comment on column ggircs_portal.product.updated_at is 'Updated date of row';
comment on column ggircs_portal.product.updated_by is 'Updator of row';
comment on column ggircs_portal.product.deleted_at is 'Date of deletion';
comment on column ggircs_portal.product.deleted_by is 'The user who deleted the row';

commit;
