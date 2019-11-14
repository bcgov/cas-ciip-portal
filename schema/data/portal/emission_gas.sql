begin;

with rows as (
insert into ggircs_portal.emission_category_gas(id, emission_category, gas_id)
overriding system value
values
(1, 'Flaring', 1),
(2, 'Flaring', 2),
(3, 'Flaring', 3),
(4, 'Flaring', 4),
(5, 'Flaring', 5),
(6, 'Venting', 1),
(7, 'Venting', 2),
(8, 'Venting', 3),
(9, 'Venting', 4),
(10, 'Venting', 5),
(11, 'Venting', 6)

on conflict(id) do update set gas_id=excluded.gas_id, emission_category=excluded.emission_category
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category_gas' from rows;

select setval
from setval('ggircs_portal.emission_category_gas_id_seq', (select max(id) from ggircs_portal.emission_category_gas), true)
where setval = 0;

commit;
