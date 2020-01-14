begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state, product_form_id)
overriding system value
values
(1, 'Liquefied Natural Gas (LNG)', 't', 'active', null),
(2, 'Cannabis flowers', 'ha', 'active', null),
(3, 'Food', 'ha', 'active', null),
(4, 'District Heat', 'GJ','active', null),
(5, 'Lumber', 'm3', 'active', null),
(6, 'Veneer', 'm3', 'active', null),
(7, 'Plywood', 'm3', 'active', null),
(8, 'Panels (MDF, OSB)', 'm3','active', null),
(9, 'Other Pulp - Mechanical pulp mills', 'Air-dried tonnes','active', null),
(10, 'Chemical Pulp', 'Air-dried tonnes','active', null),
(11, 'Other Pulp - Paper (except newsprint) mills', 'Air-dried tonnes','active', null),
(12, 'Other Pulp - Newsprint mills', 'Air-dried tonnes','active', null),
(13, 'Wood pellets (potentially hog fuel)', 'bone dry tonnes?','active', null),
(14, 'Refined White Sugar', 't','active', null),
(15, 'Liquid Sugar', 't','active', null),
(16, 'Hydrogen Peroxide (H2O2)', 't','active', null),
(17, 'Cement', 't','active', null),
(18, 'High calcium quicklime and lime kiln dust', 't','active', null),
(19,'Gypsum wallboard','m2','active', null),
(20,'Stone wool insulation','t','active',null),
(21,'Wire draw production','tonnes of wire processed','active',null),
(22,'Hot dip galvanizing','tonnes of wire processed','active',null),
(23,'Lead-Zinc Smelting','t','active',null),
(24,'Grinding media (<3.5")','t','active',null),
(25,'Grinding media (>4")','t','active',null),
(26,'Aluminum Smelting','t','active',5),
(27,'Metallurgical Coal','t','active',null),
(28,'Gold Equivalent','t','active',null),
(29,'Centrifugal Compression ','MWh','active',1),
(30,'Reciprocating Compression ','MWh','active',2),
(31,'Silver Equivalent','t','active',null),
(32,'Copper Equivalent - Underground','t','active',null),
(33,'Copper Equivalent - Open Pit','t','active',null),
(34,'Lean Sweet Gas Plants','m3OE','active',null),
(35,'Lean Sour Gas Plants','m3OE','active',null),
(36,'Lean Sour with Sulphur recovery Gas Plants','m3OE','active',null),
(37,'Rich Sweet Gas Plants','m3OE','active',4),
(38,'Rich Sour Gas Plants','m3OE','active',3),
(39,'Petroleum Refining','CAN - CWB','active',null)
on conflict(id) do update
set
name=excluded.name,
units=excluded.units,
state=excluded.state,
product_form_id=excluded.product_form_id
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

commit;
