-- Revert ggircs-portal-private:create_roles from pg

begin;

-- The create roles affects the database globally. Cannot drop the roles once created.
select true;

commit;
