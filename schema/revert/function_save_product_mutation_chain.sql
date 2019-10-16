-- Revert ggircs-portal:procedure_save_product from pg

begin;

drop function ggircs_portal.save_product_mutation_chain;

commit;
