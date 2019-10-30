begin;
with rows as (
insert into ggircs_portal.application_status
(id, application_id, application_status)
overriding system value
values (1, 1, 'draft'), (2, 2, 'pending')
on conflict(id)
do update
set
application_id=excluded.application_id,
application_status=excluded.application_status
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application_status' from rows;

select setval from
setval('ggircs_portal.application_status_id_seq', (select max(id) from ggircs_portal.application_status), true)
where setval = 0;

commit;
