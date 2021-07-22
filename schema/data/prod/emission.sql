begin;

with rows as (
insert into ggircs_portal.emission_category(id, swrs_emission_category, display_name, deleted_at, carbon_taxed)
overriding system value
values
(1, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'General Stationary Combustion', null, true),
(2, 'BC_ScheduleB_IndustrialProcessEmissions', 'Industrial Process', null, false),
(3, 'BC_ScheduleB_VentingEmissions', 'Venting', null, true),
(4, 'BC_ScheduleB_FlaringEmissions', 'Flaring', null, true),
(5, 'BC_ScheduleB_FugitiveEmissions', 'Fugitive', null, false),
(6, 'BC_ScheduleB_OnSiteTransportationEmissions', 'On-Site Transportation', null, true),
(7, 'BC_ScheduleB_WasteEmissions', 'Waste', null, false),
(8, 'BC_ScheduleB_WastewaterEmissions', 'Wastewater', null, false),
(9, null, 'Other, non-carbon taxed', '2021-04-13 00:00:00-07', false)

on conflict(id) do update set swrs_emission_category=excluded.swrs_emission_category, display_name=excluded.display_name, deleted_at=excluded.deleted_at, carbon_taxed=excluded.carbon_taxed
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category' from rows;

select setval
from setval('ggircs_portal.emission_category_id_seq', (select max(id) from ggircs_portal.emission_category), true)
where setval = 0;

commit;
