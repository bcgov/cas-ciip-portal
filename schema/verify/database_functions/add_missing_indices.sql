-- Verify ggircs-portal:database_functions/add_missing_indices on pg

begin;

-- No verify necessary, a pgTap test ensures all foreign keys have an accompanying index.

rollback;
