begin;

with rows as (
insert into ggircs_portal.application_revision(application_id, version_number, created_at)
overriding system value
values (1,1, '2019-09-17 14:49:54.191757-07')
on conflict(application_id, version_number) do update set
application_id=excluded.application_id,
version_number=excluded.version_number,
created_at=excluded.created_at
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application_revision' from rows;

commit;
