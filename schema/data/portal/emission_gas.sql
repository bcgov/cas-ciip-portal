begin;

with rows as (
insert into ggircs_portal.emission_category_gas(id, emission_category, gas_id)
overriding system value
values
(1, 'Stationary Fuel Combustion', 1),
(2, 'Stationary Fuel Combustion', 2),
(3, 'Stationary Fuel Combustion', 3),
(4, 'Stationary Fuel Combustion', 4),
(5, 'Stationary Fuel Combustion', 5),
(6, 'Venting', 1),
(7, 'Venting', 2),
(8, 'Venting', 3),
(9, 'Venting', 4),
(10, 'Venting', 5),
(11, 'Flaring', 1),
(12, 'Flaring', 2),
(13, 'Flaring', 3),
(14, 'Flaring', 4),
(15, 'Flaring', 5),
(16, 'Fugitive/Other', 1),
(17, 'Fugitive/Other', 2),
(18, 'Fugitive/Other', 3),
(19, 'Fugitive/Other', 4),
(20, 'Fugitive/Other', 5),
(21, 'Fugitive/Other', 6),
(22, 'Fugitive/Other', 7),
(23, 'Fugitive/Other', 8),
(24, 'On-Site Transportation', 1),
(25, 'On-Site Transportation', 2),
(26, 'On-Site Transportation', 3),
(27, 'On-Site Transportation', 4),
(28, 'On-Site Transportation', 5),
(29, 'Waste', 1),
(30, 'Waste', 2),
(31, 'Waste', 3),
(32, 'Waste', 4),
(33, 'Waste', 5),
(34, 'Wastewater', 1),
(35, 'Wastewater', 2),
(36, 'Wastewater', 3),
(37, 'Wastewater', 4),
(38, 'Wastewater', 5)

on conflict(id) do update set gas_id=excluded.gas_id, emission_category=excluded.emission_category
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category_gas' from rows;

select setval
from setval('ggircs_portal.emission_category_gas_id_seq', (select max(id) from ggircs_portal.emission_category_gas), true)
where setval = 0;

commit;
