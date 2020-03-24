begin;

with rows as (
insert into ggircs_portal.product(id, name, units, state, product_form_id, requires_emission_allocation)
overriding system value
values
(1, 'Aluminum Smelting','tonnes of aluminum produced','active', 5,true),
(2, 'Cannabis (flowers and seedlings) grown under cover', 'hectares of growing space', 'active', null,true),
(3, 'Cement equivalent', 'tonnes of cement equivalent','active', 6,true),
(4, 'Centrifugal Compression ','MWh','active',1,true),
(5, 'Chemical Pulp', 'bone-dry tonnes','active', null,true),
(6, 'Copper equivalent (open pit)','tonnes of Copper equivalent','active',null,true),
(7, 'Copper equivalent (underground)','tonnes of Copper equivalent','active',null,true),
(8, 'Food (including seedlings) grown under cover', 'hectares of growing space', 'active', null,true),
(9, 'District energy (heat)', 'MWh','active', null,true),
(10, 'Exported electricity', 'MWh', 'active', null,true),
(11, 'Exported heat', 'GJ', 'active', null,true),
(12, 'Gold equivalent','tonnes of gold equivalent','active',null,true),
(13, 'Forged steel balls (grinding media <3.5")','tonnes','active',null,true),
(14, 'Forged steel balls (grinding media >4")','tonnes','active',null,true),
(15, 'Gypsum wallboard','square meters','active', null,true),
(16, 'Lime', 'tonnes','active', 8,true),
(17, 'Hot dip galvanizing','tonnes of wire processed','active',null,true),
(18, 'Hydrogen Peroxide (H2O2)', 'tonnes of pure (100%) Hydrogen Peroxide produced','active', null,true),
(19, 'Lead-Zinc Smelting','tonnes of lead and zinc','active', 7,true),
(20, 'Sweet Gas Plants','e3m3OE','active',4,true),
(21, 'Sour Gas Plants','e3m3OE','active',3,true),
(22, 'Sugar (liquid)', 'tonnes','active', null,true),
(23, 'Sugar (solid)', 'tonnes','active', null,true),
(24, 'Liquefied Natural Gas (LNG)', 'tonnes', 'active', null,true),
(25, 'Lumber', 'cubic meters', 'active', null,true),
(26, 'Coal','tonnes','active',null,true),
(27, 'Veneer', 'cubic meters', 'active', null,true),
(28, 'Wood Panels (Plywood, MDF, OSB)', 'cubic meters','active', null,true),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','active', null,true),
(30, 'Wire draw production','tonnes of wire processed','active',null,true),
(31, 'Reciprocating Compression ','MWh','active',2,true),
(32, 'Silver Equivalent','tonnes of Silver equivalent','active',null,true),
(33, 'Petroleum Refining','BC refining complexity factor unit','active',null,true),
(34, 'Wood pellets', 'bone dry tonnes','active', null,true),
(35, 'Wood chips', 'bone dry tonnes','active', null,true),
(36, 'Waste rendering', 'tonnes','active', null, true)
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
