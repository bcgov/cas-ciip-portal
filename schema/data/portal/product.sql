begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state)
overriding system value
values
(1, 'Inlet Compression', 'm3', 'active'),
(2, 'Dehydration', 'm3', 'active'),
(3, 'Amine Sweetening', 'm3', 'active'),
(4, 'Total Refrigeration', 'm3', 'active'),
(5, 'Fractionation', 'm3', 'active'),
(6, 'Stabilization', 'm3', 'active'),
(7, 'Sales Compression', 'm3', 'active'),
(8, 'Sulphur Plant', 't', 'active'),
(9, 'Acid Gas Injection', 'm3', 'active'),
(10, 'Ethane Extraction', 'm3', 'active'),
(11, 'Cavern Storage', 'm3', 'active'),
(12, 'CO2 Plant', 'm3', 'active'),
(13, 'Flaring, Venting, Fugitives, others', 'm3', 'active')

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
