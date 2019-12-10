begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state, product_form_id)
overriding system value
values
(1, 'Cannabis flowers', 't', 'active', null),
(2, 'Lumber', 'm3', 'active', 1),
(3, 'Lean Sweet Gas Plants', 'Cubic meters of oil equivalent (m3OE)', 'active', 2),
(4, 'Lean Sour Gas Plants', 'Cubic meters of oil equivalent (m3OE)', 'active', 2),
(5, 'Rich Sweet Gas Plants', 'Cubic meters of oil equivalent (m3OE)', 'active', 2),
(6, 'Rich Sour Gas Plants', 'Cubic meters of oil equivalent (m3OE)', 'active', 2),
(7, 'Reciprocating Compression', 'Energy required (MWh)', 'active', 3),
(8, 'Centrifugal Compression', 'Energy required (MWh)', 'active', 3),
(9, 'Petroleum Refining', 'Canadian Complexity Weighted Barrel (CAN - CWB)', 'active', 4)
on conflict(id) do update
set
name=excluded.name,
units=excluded.units,
state=excluded.state,
product_form_id=excluded.product_form_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

commit;
