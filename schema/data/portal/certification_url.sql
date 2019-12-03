begin;

with rows as (
insert into ggircs_portal.certification_url(id, application_id, certification_url_string)
overriding system value
values
(1, 1, '474408f9-4b85-4e80-9c0f-b5492fac4c57')
on conflict(id) do update set
application_id=excluded.application_id,
certification_url_string=excluded.certification_url_string
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

select setval from
setval('ggircs_portal.certification_url_id_seq', (select max(id) from ggircs_portal.certification_url), true)
where setval = 0;

commit;
