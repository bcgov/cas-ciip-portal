begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state, requires_emission_allocation)
overriding system value
values
(1, 'Aluminum Smelting','tonnes of aluminum produced','active', true),
(2, 'Cannabis (flowers and seedlings) grown under cover', 'hectares of growing space', 'active',true),
(3, 'Cement equivalent', 'tonnes of cement equivalent','active',true),
(4, 'Centrifugal Compression ','MWh','active',true),
(5, 'Chemical Pulp', 'bone-dry tonnes','active' ,true),
(6, 'Copper equivalent (open pit)','tonnes of Copper equivalent','active' ,true),
(7, 'Copper equivalent (underground)','tonnes of Copper equivalent','active' ,true),
(8, 'Food (including seedlings) grown under cover', 'hectares of growing space', 'active' ,true),
(9, 'District energy (heat)', 'MWh','active' ,true),
(10, 'Exported electricity', 'MWh', 'active' ,true),
(11, 'Exported heat', 'GJ', 'active' ,true),
(12, 'Gold equivalent','tonnes of gold equivalent','active', true),
(13, 'Forged steel balls (grinding media <3.5")','tonnes','active', true),
(14, 'Forged steel balls (grinding media >4")','tonnes','active', true),
(15, 'Gypsum wallboard','square meters','active', true),
(16, 'Lime', 'tonnes','active', true),
(17, 'Hot dip galvanizing','tonnes of wire processed','active' ,true),
(18, 'Hydrogen Peroxide (H2O2)', 'tonnes of pure (100%) Hydrogen Peroxide produced','active' ,true),
(19, 'Lead-Zinc Smelting','tonnes of lead and zinc','active',true),
(20, 'Sweet Gas Plants','e3m3OE','active', true),
(21, 'Sour Gas Plants','e3m3OE','active', true),
(22, 'Sugar (liquid)', 'tonnes','active', true),
(23, 'Sugar (solid)', 'tonnes','active', true),
(24, 'Liquefied Natural Gas (LNG)', 'tonnes', 'active', true),
(25, 'Lumber', 'cubic meters', 'active', true),
(26, 'Coal','tonnes','active', true),
(27, 'Veneer', 'cubic meters', 'active', true),
(28, 'Wood Panels (Plywood, MDF, OSB)', 'cubic meters','active', true),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','active', true),
(30, 'Wire draw production','tonnes of wire processed','active', true),
(31, 'Reciprocating Compression ','MWh','active', true),
(32, 'Silver Equivalent','tonnes of Silver equivalent','active', true),
(33, 'Petroleum Refining','BC refining complexity factor unit','active',true),
(34, 'Wood pellets', 'bone dry tonnes','active', true),
(35, 'Wood chips', 'bone dry tonnes','active', true),
(36, 'Waste rendering', 'tonnes','active', true),
(37, 'Imported electricity', 'MWh', 'active' ,true),
(38, 'Imported heat', 'GJ', 'active' ,true),
(39, 'Generated electricity', 'MWh', 'active' ,true),
(40, 'Generated heat', 'GJ', 'active' ,true)
on conflict(id) do update
set
name=excluded.name,
units=excluded.units,
state=excluded.state,
requires_emission_allocation=excluded.requires_emission_allocation
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

commit;
