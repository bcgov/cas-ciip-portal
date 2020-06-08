-- Deploy ggircs-portal:types/linked_product_return to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.linked_product_return as (
    id integer,
    linked_product_id integer,
    product_name varchar(1000),
    product_state ggircs_portal.ciip_product_state
);

comment on type ggircs_portal.linked_product_return is '@primaryKey (id)';
commit;
