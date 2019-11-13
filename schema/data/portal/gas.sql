begin;

with rows as (
insert into ggircs_portal.gas(id, gas_type, gas_description, gwp)
overriding system value
values
(1, 'CO2nonbio', 'Carbon dioxide from non-biomass', 1),
(2, 'CO2', 'Carbon dioxide from biomass not listed in Schedule C of GGERR', 1),
(3, 'bioCO2', 'Carbon dioxide from biomass listed in Schedule C of GGERR', 1),
(4, 'CH4','Methane', 25),
(5, 'N20','Nitrous oxide', 298),
(6, 'SF6','Sulfur Hexafluoride', 22800),
(7, 'CF4','Perfluoromethane', 7390),
(8, 'C2F6','Perfluoroethane', 12200)
on conflict(id) do update set gas_type=excluded.gas_type, gwp=excluded.gwp
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.gas' from rows;

select setval
from setval('ggircs_portal.gas_id_seq', (select max(id) from ggircs_portal.gas), true)
where setval = 0;

commit;
