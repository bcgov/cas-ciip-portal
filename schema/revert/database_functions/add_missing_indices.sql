-- Revert ggircs-portal:database_functions/add_missing_indices from pg

begin;

-- No revert necessary, the deploy file that adds indices is idempotent.

commit;
