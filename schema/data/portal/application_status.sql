begin;
alter table ggircs_portal.application_status disable trigger _100_timestamps;
with rows as (
insert into ggircs_portal.application_status
(id, application_id, application_status, created_at)
overriding system value
values (1, 1, 'draft', '2019-09-17 14:49:54.191757-07'), (2, 2, 'pending', '2019-09-17 14:49:54.191757-07'), (3, 2, 'draft', '2019-09-10 14:49:54.191757-07')
on conflict(id)
do update
set
application_id=excluded.application_id,
application_status=excluded.application_status,
created_at=excluded.created_at
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application_status' from rows;

select setval from
setval('ggircs_portal.application_status_id_seq', (select max(id) from ggircs_portal.application_status), true)
where setval = 0;
alter table ggircs_portal.application_status enable trigger _100_timestamps;
commit;
