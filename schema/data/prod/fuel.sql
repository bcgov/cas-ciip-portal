begin;

with rows as (
insert into ggircs_portal.fuel(id, name, units, state, swrs_fuel_mapping_id, comments)
overriding system value
values
  (1, 'Acetylene','m3', 'active', 1, ''),
  (2, 'Agricultural Byproducts','t', 'active', 3, ''),
  (3,'Anthracite Coal','t', 'active', 4, ''),
  (4,'Asphalt & Road Oil','kL', 'active', 5, ''),
  (5,'Aviation Gasoline','kL', 'active', 6, ''),
  (6,'Aviation Turbo Fuel','kL', 'active', 7, ''),
  (7,'Biodiesel (100%)','kL', 'active', 8, ''),
  (8,'Biogas (captured methane)','m3', 'active', 11, ''),
  (9,'Bituminous Coal','t', 'active', 12, ''),
  (10,'Bone char - organics','t', 'active', 14, ''),
  (11,'Butane','kL', 'active', 16, ''),
  (12,'Butylene','kL', 'active', 17, ''),
  (13,'C/D Waste - Plastic','t', 'active', 18, ''),
  (14,'C/D Waste - Wood','t', 'active', 19, ''),
  (15,'Cloth','t', 'active', 20, ''),
  (16,'CNCGs','m3', 'active',21, ''),
  (17,'Coal Coke','t', 'active', 23, ''),
  (18,'Coal/PetCoke  blend','t', 'active', 24, ''),
  (19,'Coke Oven Gas','m3', 'active', 25, ''),
  (20,'Combustible Tall Oil','kL', 'active', 26, ''),
  (21,'Crude Oil','kL', 'active', 36, ''),
  (22,'Crude Sulfate Turpentine (CST)','kL', 'active', 37, ''),
  (23,'Crude Tall Oil (CTO)','kL', 'active', 39, ''),
  (24,'Diesel','kL', 'active', 41, ''),
  (25,'Digester Gas','m3', 'active', 43, ''),
  (26,'Distilate Fuel Oil No.1','kL', 'active', 50, ''),
  (27,'Distilate Fuel Oil No.2','kL', 'active', 52, ''),
  (28,'Distilate Fuel Oil No.4','kL', 'active', 54, ''),
  (29,'DNCGs','m3', 'active', 56, ''),
  (30,'Ethane','kL', 'active', 60, ''),
  (31,'Ethanol (100%)','kL', 'active', 61, ''),
  (32, 'Ethylene','kL', 'active', 62, ''),
  (33,'E-Waste','t', 'active', 58, ''),
  (34,'Explosives','t', 'active', 63, ''),
  (35,'Field gas or process vent gas','m3', 'active', 67, ''),
  (36,'Field Gas','m3', 'active', 65, ''),
  (37,'Foreign Bituminous Coal','t', 'active', 69, ''),
  (38,'Isobutane','kL', 'active', 70, ''),
  (39,'Isobutylene','kL', 'active', 71, ''),
  (40,'Kerosene','kL', 'active', 72, ''),
  (41,'Kerosene-type Jet Fuel','kL', 'active', 74, ''),
  (42,'Landfill Gas','m3', 'active', 75, ''),
  (43,'Light Fuel Oil','kL', 'active', 77, ''),
  (44,'Lignite','t', 'active', 79, ''),
  (45,'Liquified Petroleum Gases (LPG)','kL', 'active', 80, ''),
  (46,'Lubricants','kL', 'active', 82, ''),
  (47,'Motor Gasoline','kL', 'active', 84, ''),
  (48,'Motor Gasoline - Off-Road','kL', 'active', 85, ''),
  (49,'Municipal Solid Waste - biomass component','t', 'active', 88, ''),
  (50,'Municipal Solid Waste - non-biomass component','t', 'active', 91, ''),
  (51,'Naphtha','kL', 'active', 93, ''),
  (52,'Natural Gasoline','kL', 'active', 97, ''),
  (53,'Natural Gas','m3', 'active', 95, ''),
  (54,'Nitrous Oxide','m3', 'active', 99, ''),
  (55,'Peat','t', 'active', 101, ''),
  (56,'PEF','t', 'active', 102, ''),
  (57,'Petrochemical Feedstocks','kL', 'active', 103, ''),
  (58,'Petroleum Coke','kL', 'active', 104, ''),
  (59,'Petroleum Coke - Refinery Use','kL', 'active', 105, ''),
  (60,'Plastic','t', 'active', 107, ''),
  (61,'Propane','kL', 'active', 108, ''),
  (62,'Propylene','kL', 'active', 111, ''),
  (63,'Refinery Fuel Gas','m3', 'active', 112, ''),
  (64,'Rendered Animal Fat','kL', 'active', 114, ''),
  (65,'Residual Fuel Oil (#5 & 6)','kL', 'active', 115, ''),
  (66,'RFG - Mix Drum','m3', 'active', 117, ''),
  (67,'RFG - Reformer Gas','m3', 'active', 118, ''),
  (68,'Roofing Tear-off','t', 'active', 119, ''),
  (69,'SMR PSA Tail Gas','m3', 'active', 120, ''),
  (70,'Sodium Bicarbonate','t', 'active', 122, ''),
  (71,'Solid Byproducts','t', 'active', 124, ''),
  (72,'Spent Pulping Liquor','t', 'active', 126, ''),
  (73,'Still Gas - Refineries','m3', 'active', 129, ''),
  (74,'Still Gas','m3', 'active', 128, ''),
  (75,'Sub-Bituminous Coal','t', 'active', 131, ''),
  (76,'Tail Gas','m3', 'active', 133, ''),
  (77,'Tall Oil','kL', 'active', 134, ''),
  (78,'Tires - biomass component','t', 'active', 135, ''),
  (79,'Tires - non-biomass component','t', 'active', 136, ''),
  (80,'Trona','t', 'active', 138, ''),
  (81,'Turpentine','kL', 'active', 139, ''),
  (82,'Vegetable Oil','kL', 'active', 141, ''),
  (83,'Waste Oil','kL', 'active', 142, ''),
  (84,'Wood Waste','t', 'active', 143, ''),
  (85,'Flared Natural Gas CO2','m3', 'archived', 145, ''),
  (86,'Flared Natural Gas','m3', 'archived', 95, '
Flared Natural Gas was previously named Flared Natural Gas CH4.
It was renamed and the swrs_fuel_mapping_id was updated as applicants for the CIIP 2019 applications
were instructed to report an amount of natural gas under this fuel.

Flared Natural Gas as a fuel was deprecated for the 2020 application cycle. '),
  (87,'Flared Natural Gas N20','m3', 'archived', 147, ''),
  (88,'Vented Natural Gas','m3', 'archived', 95, 'Vented Natural Gas as a fuel was deprecated for the 2020 application cycle.')
on conflict(id) do update set
units=excluded.units,
state=excluded.state,
name=excluded.name,
swrs_fuel_mapping_id=excluded.swrs_fuel_mapping_id,
comments=excluded.comments
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.fuel' from rows;

select setval
from setval('ggircs_portal.fuel_id_seq', (select max(id) from ggircs_portal.fuel), true)
where setval = 0;

commit;
