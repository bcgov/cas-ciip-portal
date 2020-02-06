-- Revert ggircs-portal:ciip_functions/ciip_incentive_payment from pg

begin;

drop function ggircs_portal.ciip_incentive_payment;

commit;
