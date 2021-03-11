-- Deploy ggircs-portal:function_search_products to pg
-- requires: table_product

begin;

drop function ggircs_portal.search_products;

commit;
