-- Revert ggircs-portal:views/ciip_incentive_per_product from pg

begin;

drop view ggircs_portal.ciip_incentive_per_product;

commit;
