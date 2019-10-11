-- Revert ggircs-portal:function_get_products_by_bcghgid from pg

begin;

drop function ggircs_portal.get_products_by_bcghgid;

commit;
