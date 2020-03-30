begin;

with rows as (
insert into ggircs_portal.emission_category_gas(id, emission_category_id, gas_id)
overriding system value
values
(1, 1, 1),  -- General Stationary Combustion - CO2nonbio
(2, 1, 2),  -- General Stationary Combustion - CO2
(3, 1, 3),  -- General Stationary Combustion - bioCO2
(4, 1, 4),  -- General Stationary Combustion - CH4
(5, 1, 5),  -- General Stationary Combustion - N20
(6, 2, 1),  -- Industrial Process - CO2nonbio
(7, 2, 2),  -- Industrial Process - N20
(8, 2, 3),  -- Industrial Process - bioCO2
(9, 2, 4),  -- Industrial Process - CH4
(10, 2, 5), -- Industrial Process - N20
(11, 2, 6), -- Industrial Process - SF6
(12, 2, 7), -- Industrial Process - CF4
(13, 2, 8), -- Industrial Process - C2F6
(14, 3, 1), -- Venting - CO2nonbio
(15, 3, 2), -- Venting - CO2
(16, 3, 3), -- Venting - bioCO2
(17, 3, 4), -- Venting - CH4
(18, 3, 5), -- Venting - N20
(19, 4, 1), -- Flaring - CO2nonbio
(20, 4, 2), -- Flaring - CO2
(21, 4, 3), -- Flaring - bioCO2
(22, 4, 4), -- Flaring - CH4
(23, 4, 5), -- Flaring - N20
(24, 5, 1), -- Fugitive - CO2nonbio
(25, 5, 2), -- Fugitive - CO2
(26, 5, 3), -- Fugitive - bioCO2
(27, 5, 4), -- Fugitive - CH4
(28, 5, 5), -- Fugitive - N20
(29, 5, 6), -- Fugitive - SF6
(30, 5, 7), -- Fugitive - CF4
(31, 5, 8), -- Fugitive - C2F6
(32, 6, 1), -- On-Site Transportation - CO2nonbio
(33, 6, 2), -- On-Site Transportation - CO2
(34, 6, 3), -- On-Site Transportation - bioCO2
(35, 6, 4), -- On-Site Transportation - CH4
(36, 6, 5), -- On-Site Transportation - N20
(37, 7, 1), -- Waste - CO2nonbio
(38, 7, 2), -- Waste - CO2
(39, 7, 3), -- Waste - bioCO2
(40, 7, 4), -- Waste - CH4
(41, 7, 5), -- Waste - N20
(42, 8, 1), -- Waste - CO2nonbio
(43, 8, 2), -- Waste - CO2
(44, 8, 3), -- Waste - bioCO2
(45, 8, 4), -- Waste - CH4
(46, 8, 5)  -- Waste - N20

on conflict(id) do update set gas_id=excluded.gas_id, emission_category_id=excluded.emission_category_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category_gas' from rows;

select setval
from setval('ggircs_portal.emission_category_gas_id_seq', (select max(id) from ggircs_portal.emission_category_gas), true)
where setval = 0;

commit;
