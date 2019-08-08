-- Deploy ggircs-portal:product to pg
-- requires: schema_ggircs_portal


BEGIN;

create table ggircs_portal.product (
  id serial not null,
  name varchar(1000) not null,
  description varchar(10000)
);

create unique index product_id_uindex
	on ggircs_portal.product (id);

alter table ggircs_portal.product
	add constraint product_pk
		primary key (id);

comment on column ggircs_portal.product.id is 'Unique ID for the product';
comment on column ggircs_portal.product.name is 'The name of the product';

COMMIT;
