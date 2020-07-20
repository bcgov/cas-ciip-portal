-- Revert ggircs-portal:function_search_products from pg

begin;

drop function ggircs_portal.search_products;

commit;
