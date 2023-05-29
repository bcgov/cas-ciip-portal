begin;

with rows as (
insert into ggircs_portal.gwp(id, gas_id, gwp, description, reporting_year_start, reporting_year_end)
overriding system value
values
(1, (select id from ggircs_portal.gas where gas_type = 'CO2nonbio'), 1, 'All CO2 gas types have a GWP of 1 since CO2 is the equivalency benchmark', 1900, 9999),
(2, (select id from ggircs_portal.gas where gas_type = 'CO2bionC'), 1, 'All CO2 gas types have a GWP of 1 since CO2 is the equivalency benchmark', 1900, 9999),
(3, (select id from ggircs_portal.gas where gas_type = 'CO2bioC'), 1, 'All CO2 gas types have a GWP of 1 since CO2 is the equivalency benchmark', 1900, 9999),
(4, (select id from ggircs_portal.gas where gas_type = 'CH4'), 25, 'GWP value of methane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(5, (select id from ggircs_portal.gas where gas_type = 'N2O'), 298, 'GWP value of Nitrous Oxide according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(6, (select id from ggircs_portal.gas where gas_type = 'SF6'), 22800, 'GWP value of Sulfur Hexafluoride according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(7, (select id from ggircs_portal.gas where gas_type = 'CF4'), 7390, 'GWP value of Perfluoromethane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(8, (select id from ggircs_portal.gas where gas_type = 'C2F6'), 12200, 'GWP value of Perfluoroethane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(9, (select id from ggircs_portal.gas where gas_type = 'CH2F2'), 675, 'GWP value of Difluoromethane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(10, (select id from ggircs_portal.gas where gas_type = 'C2HF5'), 3500, 'GWP value of Pentafluoroethane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(11, (select id from ggircs_portal.gas where gas_type = 'C2H2F4'), 1430, 'GWP value of 1,1,1,2-Tetrafluoroethane according to GGIRCA AR4 (Assessment Report 4)', 1900, 2021),
(12, (select id from ggircs_portal.gas where gas_type = 'CH4'), 28, 'GWP value of methane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(13, (select id from ggircs_portal.gas where gas_type = 'N2O'), 265, 'GWP value of Nitrous Oxide according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(14, (select id from ggircs_portal.gas where gas_type = 'SF6'), 23500, 'GWP value of Sulfur Hexafluoride according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(15, (select id from ggircs_portal.gas where gas_type = 'CF4'), 6630, 'GWP value of Perfluoromethane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(16, (select id from ggircs_portal.gas where gas_type = 'C2F6'), 11100, 'GWP value of Perfluoroethane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(17, (select id from ggircs_portal.gas where gas_type = 'CH2F2'), 677, 'GWP value of Difluoromethane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(18, (select id from ggircs_portal.gas where gas_type = 'C2HF5'), 3170, 'GWP value of Pentafluoroethane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999),
(19, (select id from ggircs_portal.gas where gas_type = 'C2H2F4'), 1300, 'GWP value of 1,1,1,2-Tetrafluoroethane according to GGIRCA AR5 (Assessment Report 5)', 2022, 9999)

on conflict(id) do update set gas_id=excluded.gas_id, gwp=excluded.gwp, description=excluded.description, reporting_year_start=excluded.reporting_year_start, reporting_year_end=excluded.reporting_year_end
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.gwp' from rows;

select setval
from setval('ggircs_portal.gwp_id_seq', (select max(id) from ggircs_portal.gwp), true)
where setval = 0;

commit;
