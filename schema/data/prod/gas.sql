begin;

with rows as (
insert into ggircs_portal.gas(id, gas_type, gas_description, gwp)
overriding system value
values
(1, 'CO2nonbio', 'Carbon dioxide from non-biomass', 1),
(2, 'CO2bionC', 'Carbon dioxide from biomass not listed in Schedule C of GGERR', 1),
(3, 'CO2bioC', 'Carbon dioxide from biomass listed in Schedule C of GGERR', 1),
(4, 'CH4','Methane', 25),
(5, 'N2O','Nitrous oxide', 298),
(6, 'SF6','Sulfur Hexafluoride', 22800),
(7, 'CF4','Perfluoromethane', 7390),
(8, 'C2F6','Perfluoroethane', 12200),
(9, 'CH2F2', 'Difluoromethane', 675),
(10, 'C2HF5', 'Pentafluoroethane', 3500),
(11, 'C2H2F4', '1,1,1,2-Tetrafluoroethane', 1430)
on conflict(id) do update set gas_type=excluded.gas_type, gwp=excluded.gwp, gas_description=excluded.gas_description
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.gas' from rows;

select setval
from setval('ggircs_portal.gas_id_seq', (select max(id) from ggircs_portal.gas), true)
where setval = 0;

commit;
