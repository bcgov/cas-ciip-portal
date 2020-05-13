-- Deploy ggircs-portal:types/ciip_product_state to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.ciip_product_state as enum ('draft', 'published', 'archived');

commit;
