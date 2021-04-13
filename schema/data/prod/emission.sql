begin;

with rows as (
insert into ggircs_portal.emission_category(id, swrs_emission_category, display_name, deleted_at)
overriding system value
values
(1, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'General Stationary Combustion', null),
(2, 'BC_ScheduleB_IndustrialProcessEmissions', 'Industrial Process', null),
(3, 'BC_ScheduleB_VentingEmissions', 'Venting', null),
(4, 'BC_ScheduleB_FlaringEmissions', 'Flaring', null),
(5, 'BC_ScheduleB_FugitiveEmissions', 'Fugitive', null),
(6, 'BC_ScheduleB_OnSiteTransportationEmissions', 'On-Site Transportation', null),
(7, 'BC_ScheduleB_WasteEmissions', 'Waste', null),
(8, 'BC_ScheduleB_WastewaterEmissions', 'Wastewater', null),
(9, null, 'Other, non-carbon taxed', '2021-04-13 00:00:00-07')

on conflict(id) do update set swrs_emission_category=excluded.swrs_emission_category, display_name=excluded.display_name, deleted_at=excluded.deleted_at
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category' from rows;

select setval
from setval('ggircs_portal.emission_category_id_seq', (select max(id) from ggircs_portal.emission_category), true)
where setval = 0;

commit;
