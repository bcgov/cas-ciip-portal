-- Revert ggircs-portal:create_roles from pg

begin;

drop role Administrator;
drop role Analyst;
drop role Industry_User;
drop role Guest;

commit;
