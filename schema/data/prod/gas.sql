begin;

with rows as (
insert into ggircs_portal.gas(id, gas_type, gas_description, is_ciip_emission)
overriding system value
values
(1, 'CO2nonbio', 'Carbon dioxide from non-biomass', true),
(2, 'CO2bionC', 'Carbon dioxide from biomass not listed in Schedule C of GGERR', true),
(3, 'CO2bioC', 'Carbon dioxide from biomass listed in Schedule C of GGERR', false),
(4, 'CH4','Methane', true),
(5, 'N2O','Nitrous oxide', true),
(6, 'SF6','Sulfur Hexafluoride', true),
(7, 'CF4','Perfluoromethane', true),
(8, 'C2F6','Perfluoroethane', true),
(9, 'CH2F2', 'Difluoromethane', true),
(10, 'C2HF5', 'Pentafluoroethane', true),
(11, 'C2H2F4', '1,1,1,2-Tetrafluoroethane', true)
on conflict(id) do update set gas_type=excluded.gas_type, gas_description=excluded.gas_description, is_ciip_emission=excluded.is_ciip_emission
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.gas' from rows;

select setval
from setval('ggircs_portal.gas_id_seq', (select max(id) from ggircs_portal.gas), true)
where setval = 0;

commit;
