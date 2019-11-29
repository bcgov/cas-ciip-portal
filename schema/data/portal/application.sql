begin;

with rows as (
insert into ggircs_portal.application(id, facility_id, reporting_year)
overriding system value
values (1,3, 2018), (2,2, 2019)
on conflict(id) do update set facility_id=excluded.facility_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application' from rows;

select setval from
setval('ggircs_portal.application_id_seq', (select max(id) from ggircs_portal.application), true)
where setval = 0;

commit;
