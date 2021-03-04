-- Revert ggircs-portal:computed_columns/product_current_eligibility_threshold from pg

begin;

drop function ggircs_portal.product_current_eligibility_threshold;

commit;
