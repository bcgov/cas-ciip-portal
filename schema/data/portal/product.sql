begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state)
overriding system value
values
(1,'Flaring, Venting, Fugitives, others', 'm3', 'active'),
(2,'Sales Compression', 'm3', 'active'),
(3,'Dehydration', 'kL', 'active'),
(4,'Inlet Compression', 't', 'active')
on conflict(id) do update
set
name=excluded.name,
units=excluded.units,
state=excluded.state
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

commit;
