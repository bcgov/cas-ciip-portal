-- Revert ggircs-portal:types/ciip_incentive_payment from pg

begin;

drop type ggircs_portal.ciip_incentive_by_product;

commit;
