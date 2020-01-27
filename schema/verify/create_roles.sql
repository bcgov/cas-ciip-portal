-- Verify ggircs-portal:create_roles on pg

begin;

select 1 from pg_roles where rolname='Administrator';
select 1 from pg_roles where rolname='Analyst';
select 1 from pg_roles where rolname='Industry_User';
select 1 from pg_roles where rolname='Guest';

rollback;
