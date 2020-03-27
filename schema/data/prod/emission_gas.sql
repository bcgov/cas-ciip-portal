begin;

with rows as (
insert into ggircs_portal.emission_category_gas(id, emission_category_id, gas_id)
overriding system value
values
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10, 2, 5),
(11, 3, 1),
(12, 3, 2),
(13, 3, 3),
(14, 3, 4),
(15, 3, 5),
(16, 4, 1),
(17, 4, 2),
(18, 4, 3),
(19, 4, 4),
(20, 4, 5),
(21, 4, 6),
(22, 4, 7),
(23, 4, 8),
(24, 5, 1),
(25, 5, 2),
(26, 5, 3),
(27, 5, 4),
(28, 5, 5),
(29, 6, 1),
(30, 6, 2),
(31, 6, 3),
(32, 6, 4),
(33, 6, 5),
(34, 7, 1),
(35, 7, 2),
(36, 7, 3),
(37, 7, 4),
(38, 7, 5),
(39, 8, 1),
(40, 8, 2),
(41, 8, 3),
(42, 8, 4),
(43, 8, 5),
(44, 8, 6),
(45, 8, 7),
(46, 8, 8)

on conflict(id) do update set gas_id=excluded.gas_id, emission_category_id=excluded.emission_category_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category_gas' from rows;

select setval
from setval('ggircs_portal.emission_category_gas_id_seq', (select max(id) from ggircs_portal.emission_category_gas), true)
where setval = 0;

commit;
