-- Verify ggircs-portal:create_roles on pg

begin;

select 1 from pg_roles where rolname='ciip_administrator';
select 1 from pg_roles where rolname='cii_analyst';
select 1 from pg_roles where rolname='ciip_industry_user';
select 1 from pg_roles where rolname='ciip_guest';

rollback;
