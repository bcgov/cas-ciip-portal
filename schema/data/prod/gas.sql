begin;

with rows as (
insert into ggircs_portal.gas(id, gas_type, gas_description, gwp, is_ciip_emission)
overriding system value
values
(1, 'CO2nonbio', 'Carbon dioxide from non-biomass', 1, true),
(2, 'CO2bionC', 'Carbon dioxide from biomass not listed in Schedule C of GGERR', 1, true),
(3, 'CO2bioC', 'Carbon dioxide from biomass listed in Schedule C of GGERR', 1, false),
(4, 'CH4','Methane', 25, true),
(5, 'N2O','Nitrous oxide', 298, true),
(6, 'SF6','Sulfur Hexafluoride', 22800, true),
(7, 'CF4','Perfluoromethane', 7390, true),
(8, 'C2F6','Perfluoroethane', 12200, true),
(9, 'CH2F2', 'Difluoromethane', 675, true),
(10, 'C2HF5', 'Pentafluoroethane', 3500, true),
(11, 'C2H2F4', '1,1,1,2-Tetrafluoroethane', 1430, true)
on conflict(id) do update set gas_type=excluded.gas_type, gwp=excluded.gwp, gas_description=excluded.gas_description, is_ciip_emission=excluded.is_ciip_emission
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.gas' from rows;

select setval
from setval('ggircs_portal.gas_id_seq', (select max(id) from ggircs_portal.gas), true)
where setval = 0;

commit;
