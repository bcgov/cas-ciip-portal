-- Deploy ggircs-portal:table_product_form to pg
-- requires: table_product

begin;

create table ggircs_portal.product_form (
  id integer primary key generated always as identity,
  product_form_description varchar(10000),
  product_form_schema jsonb not null
);

grant all on table ggircs_portal.product_form to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on table ggircs_portal.product_form is 'The table that holds the custom form schemas and calculation formulas for complex products';
comment on column ggircs_portal.product_form.id is 'A generated primary key id for the row';
comment on column ggircs_portal.product_form.product_form_description is 'The description of the custom form schema';
comment on column ggircs_portal.product_form.product_form_schema is 'The json schema used to render the form';

commit;
