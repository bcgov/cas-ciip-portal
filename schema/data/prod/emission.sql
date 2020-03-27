begin;

with rows as (
insert into ggircs_portal.emission_category(id, swrs_emission_category, display_name)
overriding system value
values
(1, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'Stationary Fuel Combustion'),
(2, 'BC_ScheduleB_VentingEmissions', 'Venting'),
(3, 'BC_ScheduleB_FlaringEmissions', 'Flaring'),
(4, 'BC_ScheduleB_FugitiveEmissions', 'Fugitive/Other'),
(5, 'BC_ScheduleB_OnSiteTransportationEmissions', 'On-Site Transportation'),
(6, 'BC_ScheduleB_WasteEmissions', 'Waste'),
(7, 'BC_ScheduleB_WastewaterEmissions', 'Wastewater'),
(8, 'BC_ScheduleB_IndustrialProcessEmissions', 'Industrial Process')

on conflict(id) do update set swrs_emission_category=excluded.swrs_emission_category, display_name=excluded.display_name
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category' from rows;

select setval
from setval('ggircs_portal.emission_category_id_seq', (select max(id) from ggircs_portal.emission_category), true)
where setval = 0;

commit;
