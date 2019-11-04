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
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by varchar(1000)
);

comment on column ggircs_portal.product.id is 'Unique ID for the product';
comment on column ggircs_portal.product.name is 'The name of the product';
comment on column ggircs_portal.product.description is 'The description of the product';
comment on column ggircs_portal.product.description is 'The unit of measure for the product';
comment on column ggircs_portal.product.state is 'The current state of the product within the lifecycle (created, split, merged, redefined, archived, unarchived)';
comment on column ggircs_portal.product.parent is 'The parent ID(s) (previous state) of the product';
comment on column ggircs_portal.product.created_at is 'Creation date of row';
comment on column ggircs_portal.product.created_by is 'Creator of row';
comment on column ggircs_portal.product.updated_at is 'Updated date of row';
comment on column ggircs_portal.product.updated_by is 'Updator of row';
comment on column ggircs_portal.product.deleted_at is 'Date of deletion';
comment on column ggircs_portal.product.deleted_by is 'The user who deleted the row';

commit;
