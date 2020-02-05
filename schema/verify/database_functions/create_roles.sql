-- Verify ggircs-portal:create_roles on pg

begin;

do
$verify$
begin

if (select not exists(select true from pg_roles where rolname='ciip_administrator')) then
  raise exception 'role ciip_administrator does not exist.';

elsif (select not exists(select true from pg_roles where rolname='ciip_analyst')) then
  raise exception 'role ciip_analyst does not exist.';

elsif (select not exists(select true from pg_roles where rolname='ciip_industry_user')) then
  raise exception 'role ciip_industry_user does not exist.';

elsif (select not exists(select true from pg_roles where rolname='ciip_guest')) then
  raise exception 'role ciip_guest does not exist.';
end if;

end
$verify$;

rollback;
