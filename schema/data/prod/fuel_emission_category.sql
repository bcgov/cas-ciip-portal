begin;

with rows as (
insert into ggircs_portal.fuel_emission_category (
    id,
    fuel_id,
    emission_category_id
)
overriding system value
 values
(1, (select id from ggircs_portal.fuel where name='Acetylene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(2, (select id from ggircs_portal.fuel where name='Acetylene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(3, (select id from ggircs_portal.fuel where name='Agricultural Byproducts'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(4, (select id from ggircs_portal.fuel where name='Agricultural Byproducts'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(5, (select id from ggircs_portal.fuel where name='Anthracite Coal'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(6, (select id from ggircs_portal.fuel where name='Anthracite Coal'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(7, (select id from ggircs_portal.fuel where name='Asphalt & Road Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(8, (select id from ggircs_portal.fuel where name='Asphalt & Road Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(9, (select id from ggircs_portal.fuel where name='Aviation Gasoline'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(10, (select id from ggircs_portal.fuel where name='Aviation Gasoline'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(11, (select id from ggircs_portal.fuel where name='Aviation Turbo Fuel'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(12, (select id from ggircs_portal.fuel where name='Aviation Turbo Fuel'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(13, (select id from ggircs_portal.fuel where name='Biodiesel (100%)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(14, (select id from ggircs_portal.fuel where name='Biodiesel (100%)'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(15, (select id from ggircs_portal.fuel where name='Biodiesel (100%)'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(16, (select id from ggircs_portal.fuel where name='Biogas (captured methane)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(17, (select id from ggircs_portal.fuel where name='Biogas (captured methane)'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(18, (select id from ggircs_portal.fuel where name='Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(19, (select id from ggircs_portal.fuel where name='Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(20, (select id from ggircs_portal.fuel where name='Bone char - organics'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(21, (select id from ggircs_portal.fuel where name='Bone char - organics'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(22, (select id from ggircs_portal.fuel where name='Butane'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(23, (select id from ggircs_portal.fuel where name='Butane'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(24, (select id from ggircs_portal.fuel where name='Butane'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(25, (select id from ggircs_portal.fuel where name='Butane'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(26, (select id from ggircs_portal.fuel where name='Butylene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(27, (select id from ggircs_portal.fuel where name='Butylene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(28, (select id from ggircs_portal.fuel where name='C/D Waste - Plastic'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(29, (select id from ggircs_portal.fuel where name='C/D Waste - Plastic'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(30, (select id from ggircs_portal.fuel where name='C/D Waste - Wood'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(31, (select id from ggircs_portal.fuel where name='C/D Waste - Wood'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(32, (select id from ggircs_portal.fuel where name='Cloth'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(33, (select id from ggircs_portal.fuel where name='Cloth'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(34, (select id from ggircs_portal.fuel where name='CNCGs'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(35, (select id from ggircs_portal.fuel where name='CNCGs'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(36, (select id from ggircs_portal.fuel where name='Coal Coke'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(37, (select id from ggircs_portal.fuel where name='Coal Coke'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(38, (select id from ggircs_portal.fuel where name='Coal Coke'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(39, (select id from ggircs_portal.fuel where name='Coal/PetCoke  blend'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(40, (select id from ggircs_portal.fuel where name='Coal/PetCoke  blend'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(41, (select id from ggircs_portal.fuel where name='Coal/PetCoke  blend'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(42, (select id from ggircs_portal.fuel where name='Coke Oven Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(43, (select id from ggircs_portal.fuel where name='Coke Oven Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(44, (select id from ggircs_portal.fuel where name='Coke Oven Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(45, (select id from ggircs_portal.fuel where name='Coke Oven Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(46, (select id from ggircs_portal.fuel where name='Combustible Tall Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(47, (select id from ggircs_portal.fuel where name='Combustible Tall Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(48, (select id from ggircs_portal.fuel where name='Crude Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(49, (select id from ggircs_portal.fuel where name='Crude Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(50, (select id from ggircs_portal.fuel where name='Crude Sulfate Turpentine (CST)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(51, (select id from ggircs_portal.fuel where name='Crude Sulfate Turpentine (CST)'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(52, (select id from ggircs_portal.fuel where name='Crude Tall Oil (CTO)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(53, (select id from ggircs_portal.fuel where name='Crude Tall Oil (CTO)'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(54, (select id from ggircs_portal.fuel where name='Diesel'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(55, (select id from ggircs_portal.fuel where name='Diesel'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(56, (select id from ggircs_portal.fuel where name='Diesel'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(57, (select id from ggircs_portal.fuel where name='Digester Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(58, (select id from ggircs_portal.fuel where name='Digester Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(59, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.1'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(60, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.1'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(61, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.2'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(62, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.2'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(63, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.2'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(64, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.4'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(65, (select id from ggircs_portal.fuel where name='Distilate Fuel Oil No.4'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(66, (select id from ggircs_portal.fuel where name='DNCGs'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(67, (select id from ggircs_portal.fuel where name='DNCGs'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(68, (select id from ggircs_portal.fuel where name='Ethane'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(69, (select id from ggircs_portal.fuel where name='Ethane'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(70, (select id from ggircs_portal.fuel where name='Ethane'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(71, (select id from ggircs_portal.fuel where name='Ethane'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(72, (select id from ggircs_portal.fuel where name='Ethanol (100%)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(73, (select id from ggircs_portal.fuel where name='Ethanol (100%)'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(74, (select id from ggircs_portal.fuel where name='Ethylene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(75, (select id from ggircs_portal.fuel where name='Ethylene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(76, (select id from ggircs_portal.fuel where name='E-Waste'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(77, (select id from ggircs_portal.fuel where name='E-Waste'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(78, (select id from ggircs_portal.fuel where name='Explosives'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(79, (select id from ggircs_portal.fuel where name='Explosives'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(80, (select id from ggircs_portal.fuel where name='Field Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(81, (select id from ggircs_portal.fuel where name='Field Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(82, (select id from ggircs_portal.fuel where name='Field Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(83, (select id from ggircs_portal.fuel where name='Field Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(84, (select id from ggircs_portal.fuel where name='Field gas or process vent gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(85, (select id from ggircs_portal.fuel where name='Field gas or process vent gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(86, (select id from ggircs_portal.fuel where name='Field gas or process vent gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(87, (select id from ggircs_portal.fuel where name='Field gas or process vent gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(88, (select id from ggircs_portal.fuel where name='Foreign Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(89, (select id from ggircs_portal.fuel where name='Foreign Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(90, (select id from ggircs_portal.fuel where name='Isobutane'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(91, (select id from ggircs_portal.fuel where name='Isobutane'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(92, (select id from ggircs_portal.fuel where name='Isobutane'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(93, (select id from ggircs_portal.fuel where name='Isobutane'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(94, (select id from ggircs_portal.fuel where name='Isobutylene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(95, (select id from ggircs_portal.fuel where name='Isobutylene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(96, (select id from ggircs_portal.fuel where name='Kerosene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(97, (select id from ggircs_portal.fuel where name='Kerosene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(98, (select id from ggircs_portal.fuel where name='Kerosene-type Jet Fuel'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(99, (select id from ggircs_portal.fuel where name='Kerosene-type Jet Fuel'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(100, (select id from ggircs_portal.fuel where name='Landfill Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(101, (select id from ggircs_portal.fuel where name='Landfill Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(102, (select id from ggircs_portal.fuel where name='Light Fuel Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(103, (select id from ggircs_portal.fuel where name='Light Fuel Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(104, (select id from ggircs_portal.fuel where name='Lignite'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(105, (select id from ggircs_portal.fuel where name='Lignite'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(106, (select id from ggircs_portal.fuel where name='Liquified Petroleum Gases (LPG)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(107, (select id from ggircs_portal.fuel where name='Liquified Petroleum Gases (LPG)'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(108, (select id from ggircs_portal.fuel where name='Liquified Petroleum Gases (LPG)'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(109, (select id from ggircs_portal.fuel where name='Liquified Petroleum Gases (LPG)'),(select id from ggircs_portal.emission_category where display_name='Flaring')),
(110, (select id from ggircs_portal.fuel where name='Liquified Petroleum Gases (LPG)'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(111, (select id from ggircs_portal.fuel where name='Lubricants'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(112, (select id from ggircs_portal.fuel where name='Lubricants'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(113, (select id from ggircs_portal.fuel where name='Motor Gasoline - Off-Road'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(114, (select id from ggircs_portal.fuel where name='Motor Gasoline - Off-Road'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(115, (select id from ggircs_portal.fuel where name='Motor Gasoline - Off-Road'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(116, (select id from ggircs_portal.fuel where name='Motor Gasoline'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(117, (select id from ggircs_portal.fuel where name='Motor Gasoline'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(118, (select id from ggircs_portal.fuel where name='Motor Gasoline'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(119, (select id from ggircs_portal.fuel where name='Municipal Solid Waste - biomass component'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(120, (select id from ggircs_portal.fuel where name='Municipal Solid Waste - biomass component'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(121, (select id from ggircs_portal.fuel where name='Municipal Solid Waste - non-biomass component'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(122, (select id from ggircs_portal.fuel where name='Municipal Solid Waste - non-biomass component'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(123, (select id from ggircs_portal.fuel where name='Naphtha'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(124, (select id from ggircs_portal.fuel where name='Naphtha'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(125, (select id from ggircs_portal.fuel where name='Naphtha'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(126, (select id from ggircs_portal.fuel where name='Natural Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(127, (select id from ggircs_portal.fuel where name='Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(128, (select id from ggircs_portal.fuel where name='Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),
(129, (select id from ggircs_portal.fuel where name='Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(130, (select id from ggircs_portal.fuel where name='Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(131, (select id from ggircs_portal.fuel where name='Natural Gasoline'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(132, (select id from ggircs_portal.fuel where name='Natural Gasoline'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(133, (select id from ggircs_portal.fuel where name='Natural Gasoline'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(134, (select id from ggircs_portal.fuel where name='Nitrous Oxide'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(135, (select id from ggircs_portal.fuel where name='Nitrous Oxide'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(136, (select id from ggircs_portal.fuel where name='Peat'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(137, (select id from ggircs_portal.fuel where name='Peat'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(138, (select id from ggircs_portal.fuel where name='PEF'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(139, (select id from ggircs_portal.fuel where name='PEF'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(140, (select id from ggircs_portal.fuel where name='Petrochemical Feedstocks'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(141, (select id from ggircs_portal.fuel where name='Petrochemical Feedstocks'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(142, (select id from ggircs_portal.fuel where name='Petrochemical Feedstocks'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(143, (select id from ggircs_portal.fuel where name='Petroleum Coke - Refinery Use'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(144, (select id from ggircs_portal.fuel where name='Petroleum Coke - Refinery Use'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(145, (select id from ggircs_portal.fuel where name='Petroleum Coke - Refinery Use'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(146, (select id from ggircs_portal.fuel where name='Petroleum Coke'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(147, (select id from ggircs_portal.fuel where name='Petroleum Coke'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(148, (select id from ggircs_portal.fuel where name='Petroleum Coke'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(149, (select id from ggircs_portal.fuel where name='Plastic'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(150, (select id from ggircs_portal.fuel where name='Plastic'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(151, (select id from ggircs_portal.fuel where name='Propane'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(152, (select id from ggircs_portal.fuel where name='Propane'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(153, (select id from ggircs_portal.fuel where name='Propane'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(154, (select id from ggircs_portal.fuel where name='Propane'),(select id from ggircs_portal.emission_category where display_name='Flaring')),
(155, (select id from ggircs_portal.fuel where name='Propane'),(select id from ggircs_portal.emission_category where display_name='On-Site Transportation')),

(156, (select id from ggircs_portal.fuel where name='Propylene'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(157, (select id from ggircs_portal.fuel where name='Propylene'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(158, (select id from ggircs_portal.fuel where name='Refinery Fuel Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(159, (select id from ggircs_portal.fuel where name='Refinery Fuel Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(160, (select id from ggircs_portal.fuel where name='Refinery Fuel Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(161, (select id from ggircs_portal.fuel where name='Refinery Fuel Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(162, (select id from ggircs_portal.fuel where name='Rendered Animal Fat'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(163, (select id from ggircs_portal.fuel where name='Rendered Animal Fat'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(164, (select id from ggircs_portal.fuel where name='Residual Fuel Oil (#5 & 6)'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(165, (select id from ggircs_portal.fuel where name='Residual Fuel Oil (#5 & 6)'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(166, (select id from ggircs_portal.fuel where name='RFG - Mix Drum'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(167, (select id from ggircs_portal.fuel where name='RFG - Mix Drum'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(168, (select id from ggircs_portal.fuel where name='RFG - Mix Drum'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(169, (select id from ggircs_portal.fuel where name='RFG - Mix Drum'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(170, (select id from ggircs_portal.fuel where name='RFG - Reformer Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(171, (select id from ggircs_portal.fuel where name='RFG - Reformer Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(172, (select id from ggircs_portal.fuel where name='RFG - Reformer Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(173, (select id from ggircs_portal.fuel where name='RFG - Reformer Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(174, (select id from ggircs_portal.fuel where name='Roofing Tear-off'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(175, (select id from ggircs_portal.fuel where name='Roofing Tear-off'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(176, (select id from ggircs_portal.fuel where name='SMR PSA Tail Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(177, (select id from ggircs_portal.fuel where name='SMR PSA Tail Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(178, (select id from ggircs_portal.fuel where name='Sodium Bicarbonate'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(179, (select id from ggircs_portal.fuel where name='Sodium Bicarbonate'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(180, (select id from ggircs_portal.fuel where name='Solid Byproducts'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(181, (select id from ggircs_portal.fuel where name='Solid Byproducts'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(182, (select id from ggircs_portal.fuel where name='Spent Pulping Liquor'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(183, (select id from ggircs_portal.fuel where name='Spent Pulping Liquor'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(184, (select id from ggircs_portal.fuel where name='Spent Pulping Liquor'),(select id from ggircs_portal.emission_category where display_name='Industrial Process')),

(185, (select id from ggircs_portal.fuel where name='Still Gas - Refineries'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(186, (select id from ggircs_portal.fuel where name='Still Gas - Refineries'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(187, (select id from ggircs_portal.fuel where name='Still Gas - Refineries'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(188, (select id from ggircs_portal.fuel where name='Still Gas - Refineries'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(189, (select id from ggircs_portal.fuel where name='Still Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(190, (select id from ggircs_portal.fuel where name='Still Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),
(191, (select id from ggircs_portal.fuel where name='Still Gas'),(select id from ggircs_portal.emission_category where display_name='Venting')),
(192, (select id from ggircs_portal.fuel where name='Still Gas'),(select id from ggircs_portal.emission_category where display_name='Flaring')),

(193, (select id from ggircs_portal.fuel where name='Sub-Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(194, (select id from ggircs_portal.fuel where name='Sub-Bituminous Coal'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(195, (select id from ggircs_portal.fuel where name='Tail Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(196, (select id from ggircs_portal.fuel where name='Tail Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(197, (select id from ggircs_portal.fuel where name='Tall Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(198, (select id from ggircs_portal.fuel where name='Tall Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(199, (select id from ggircs_portal.fuel where name='Tires - biomass component'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(200, (select id from ggircs_portal.fuel where name='Tires - biomass component'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(201, (select id from ggircs_portal.fuel where name='Tires - non-biomass component'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(202, (select id from ggircs_portal.fuel where name='Tires - non-biomass component'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(203, (select id from ggircs_portal.fuel where name='Trona'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(204, (select id from ggircs_portal.fuel where name='Trona'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(205, (select id from ggircs_portal.fuel where name='Turpentine'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(206, (select id from ggircs_portal.fuel where name='Turpentine'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(207, (select id from ggircs_portal.fuel where name='Vegetable Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(208, (select id from ggircs_portal.fuel where name='Vegetable Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(209, (select id from ggircs_portal.fuel where name='Waste Oil'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(210, (select id from ggircs_portal.fuel where name='Waste Oil'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(211, (select id from ggircs_portal.fuel where name='Wood Waste'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(212, (select id from ggircs_portal.fuel where name='Wood Waste'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(213, (select id from ggircs_portal.fuel where name='Flared Natural Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(214, (select id from ggircs_portal.fuel where name='Flared Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Waste')),

(215, (select id from ggircs_portal.fuel where name='Vented Natural Gas'),(select id from ggircs_portal.emission_category where display_name='General Stationary Combustion')),
(216, (select id from ggircs_portal.fuel where name='Vented Natural Gas'),(select id from ggircs_portal.emission_category where display_name='Waste'))
on conflict(id) do update set
fuel_id=excluded.fuel_id,
emission_category_id=excluded.emission_category_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.fuel_emission_category' from rows;

select setval
from setval('ggircs_portal.fuel_emission_category_id_seq', (select max(id) from ggircs_portal.fuel_emission_category), true)
where setval = 0;

commit;
