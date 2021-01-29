-- Revert ggircs-portal:database_functions/create_portal_app_user from pg

begin;

-- The create roles affects the server globally. Cannot drop the roles once created.
-- This affects development enviroments, where dev and test databases are in the same postgres instance
select true;

commit;
