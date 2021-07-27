begin;

with rows as (
insert into ggircs_portal.emission_category(id, swrs_emission_category, display_name, deleted_at, carbon_taxed, category_definition)
overriding system value
values
(1, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'General Stationary Combustion', null, true,
  $$ "general stationary combustion" means the combustion of fuel or waste in a boiler, combustion turbine, stationary engine, kiln, heater, incinerator, furnace, mobile crude oil compressor, or natural gas drilling rig while being used at a well site, or any other stationary device using combustion
  (a)to produce steam or heat or other forms of energy, or
  (b)to reduce volumes of waste,
  but does not include
    (c)the combustion of fuel to produce electricity,
    (d)refinery fuel gas combustion,
    (e)combustion by construction-related equipment temporarily used at a construction site,
    (f)combustion in generators used for emergency purposes only, or
    (g)emergency flaring
  $$
),
(2, 'BC_ScheduleB_IndustrialProcessEmissions', 'Industrial Process', null, false,
  $$
    "industrial process emissions" means emissions from an industrial process that involves chemical or physical reactions other than combustion
  $$
),
(3, 'BC_ScheduleB_VentingEmissions', 'Venting', null, true,
  $$
    "venting emissions" means controlled or intended emissions that occur due to the design of equipment, or due to pressure beyond the capacity of manufacturing or processing equipment, and includes emissions from
      (a)releases of casing gas, a gas associated with a liquid, solution gas, treater, stabilizer or dehydrator off-gas or blanket gas,
      (b)releases from pneumatic devices that use natural gas as a driver,
      (c)releases from compressor start-ups, pipelines and other blowdowns, and
      (d)releases from metering and regulation station control loops,
      but does not include
        (e)emissions from combustion,
        (f)industrial process emissions, or
        (g)fugitive emissions
  $$
),
(4, 'BC_ScheduleB_FlaringEmissions', 'Flaring', null, true,
  $$
    "flaring emissions" means emissions from the combustion of a gas or liquid for a purpose other than producing energy or reducing volumes of waste, including from combustion of waste petroleum, hazardous emission prevention systems, well testing, natural gas gathering systems, natural gas processing plants, crude oil production and pipeline operations
  $$
),
(5, 'BC_ScheduleB_FugitiveEmissions', 'Fugitive', null, false,
  $$
    "fugitive emissions" means the unintended or incidental emissions of greenhouse gases from the transmission, processing, storage, use or transportation of fossil fuels, greenhouse gases or other
  $$
),
(6, 'BC_ScheduleB_OnSiteTransportationEmissions', 'On-Site Transportation', null, true,
  $$
    Fuel combustion by mobile equipment that is part of the facility
  $$
),
(7, 'BC_ScheduleB_WasteEmissions', 'Waste', null, true,
  $$
    General stationary combustion of waste without production of useful energy
  $$
),
(8, 'BC_ScheduleB_WastewaterEmissions', 'Wastewater', null, false,
  $$
    (a) Industrial wastewater process using anaerobic digestion	Methane,
    (b) Oil-water separators
  $$
),
(9, null, 'Other, non-carbon taxed', '2021-04-13 00:00:00-07', false,
  $$
    Other, non-carbon taxed is a catch-all category as requested by CAS (Climate Action Secretariat)
  $$
)

on conflict(id) do update set swrs_emission_category=excluded.swrs_emission_category, display_name=excluded.display_name, deleted_at=excluded.deleted_at, carbon_taxed=excluded.carbon_taxed, category_definition=excluded.category_definition
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.emission_category' from rows;

select setval
from setval('ggircs_portal.emission_category_id_seq', (select max(id) from ggircs_portal.emission_category), true)
where setval = 0;

commit;
