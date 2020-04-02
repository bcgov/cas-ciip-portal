begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state, requires_emission_allocation, requires_product_amount)
overriding system value
values
(1, 'Aluminum Smelting','tonnes of aluminum produced','active', true, true),
(2, 'Cannabis (flowers and seedlings) grown under cover', 'hectares of growing space', 'active',true, true),
(3, 'Cement equivalent', 'tonnes of cement equivalent','active',true, true),
(4, 'Centrifugal Compression ','MWh','active',true, true),
(5, 'Chemical Pulp', 'bone-dry tonnes','active' ,true, true),
(6, 'Copper equivalent (open pit)','tonnes of Copper equivalent','active' ,true, true),
(7, 'Copper equivalent (underground)','tonnes of Copper equivalent','active' ,true, true),
(8, 'Food (including seedlings) grown under cover', 'hectares of growing space', 'active' ,true, true),
(9, 'District energy (heat)', 'MWh','active' ,true, true),
(10, 'Exported electricity', 'MWh', 'active' ,true, true),
(11, 'Exported heat', 'GJ', 'active' ,true, true),
(12, 'Gold equivalent','tonnes of gold equivalent','active', true, true),
(13, 'Forged steel balls (grinding media <3.5")','tonnes','active', true, true),
(14, 'Forged steel balls (grinding media >4")','tonnes','active', true, true),
(15, 'Gypsum wallboard','square meters','active', true, true),
(16, 'Lime', 'tonnes','active', true, true),
(17, 'Hot dip galvanizing','tonnes of wire processed','active' ,true, true),
(18, 'Hydrogen Peroxide (H2O2)', 'tonnes of pure (100%) Hydrogen Peroxide produced','active' ,true, true),
(19, 'Lead-Zinc Smelting','tonnes of lead and zinc','active',true, true),
(20, 'Sweet Gas Plants','e3m3OE','active', true, true),
(21, 'Sour Gas Plants','e3m3OE','active', true, true),
(22, 'Sugar (liquid)', 'tonnes','active', true, true),
(23, 'Sugar (solid)', 'tonnes','active', true, true),
(24, 'Liquefied Natural Gas (LNG)', 'tonnes', 'active', true, true),
(25, 'Lumber', 'cubic meters', 'active', true, true),
(26, 'Coal','tonnes','active', true, true),
(27, 'Veneer', 'cubic meters', 'active', true, true),
(28, 'Wood Panels (Plywood, MDF, OSB)', 'cubic meters','active', true, true),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','active', true, true),
(30, 'Wire draw production','tonnes of wire processed','active', true, true),
(31, 'Reciprocating Compression ','MWh','active', true, true),
(32, 'Silver Equivalent','tonnes of Silver equivalent','active', true, true),
(33, 'Petroleum Refining','BC refining complexity factor unit','active',true, true),
(34, 'Wood pellets', 'bone dry tonnes','active', true, true),
(35, 'Wood chips', 'bone dry tonnes','active', true, true),
(36, 'Waste rendering', 'tonnes','active', true, true)
(37, 'Purchased electricity', 'GWh', 'active' ,true, true),
(38, 'Purchased heat', 'GJ', 'active' ,true, true),
(39, 'Generated electricity', 'GWh', 'active' ,true, true),
(40, 'Generated heat', 'GJ', 'active' ,true, true)
on conflict(id) do update
set
name=excluded.name,
units=excluded.units,
state=excluded.state,
requires_emission_allocation=excluded.requires_emission_allocation,
requires_product_amount=excluded.requires_product_amount
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

commit;
