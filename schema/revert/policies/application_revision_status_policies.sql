-- Revert ggircs-portal:policies/application_revision_policies from pg

begin;

-- No revert required here. All privileges are revoked in revert/database_functions/grant_permisisons
select true;

commit;
