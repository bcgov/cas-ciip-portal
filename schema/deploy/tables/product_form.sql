-- Deploy ggircs-portal:table_product_form to pg
-- requires: table_product

begin;

create table ggircs_portal.product_form (
  id integer primary key generated always as identity,
  product_form_description varchar(10000),
  product_form_schema jsonb not null
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'product_form', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'product_form', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'product_form', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'product_form', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'product_form', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.product_form enable row level security;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_product_form', 'product_form', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_product_form', 'product_form', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_product_form', 'product_form', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_product_form', 'product_form', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_product_form', 'product_form', 'select', 'ciip_industry_user', 'true');

end
$policy$;

comment on table ggircs_portal.product_form is 'The table that holds the custom form schemas and calculation formulas for complex products';
comment on column ggircs_portal.product_form.id is 'A generated primary key id for the row';
comment on column ggircs_portal.product_form.product_form_description is 'The description of the custom form schema';
comment on column ggircs_portal.product_form.product_form_schema is 'The json schema used to render the form';

commit;
