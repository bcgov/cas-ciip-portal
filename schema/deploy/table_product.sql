-- Deploy ggircs-portal:product to pg
-- requires: schema_ggircs_portal


BEGIN;

create table ggircs_portal.product (
  id serial not null,
  name varchar(1000) not null,
  description varchar(10000),
  state varchar(1000),
  parent integer ARRAY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(1000),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by varchar(1000)
);

create unique index product_id_uindex
	on ggircs_portal.product (id);

alter table ggircs_portal.product
	add constraint product_pk
		primary key (id);

comment on column ggircs_portal.product.id is 'Unique ID for the product';
comment on column ggircs_portal.product.name is 'The name of the product';
comment on column ggircs_portal.product.description is 'The description of the product';
comment on column ggircs_portal.product.state is 'The current state of the product within the lifecycle (created, split, merged, redefined, archived, unarchived)';
comment on column ggircs_portal.product.parent is 'The parent ID(s) (previous state) of the product';
comment on column ggircs_portal.product.created_at is 'Creation date of row';
comment on column ggircs_portal.product.created_by is 'Creator of row';
comment on column ggircs_portal.product.deleted_at is 'Date of deletion';
comment on column ggircs_portal.product.deleted_by is 'The user who deleted the row';

COMMIT;