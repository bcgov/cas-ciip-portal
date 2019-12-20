-- Revert ggircs-portal:view_ciip_incentive_payment from pg

begin;

drop view ggircs_portal.ciip_incentive_payment;

commit;
