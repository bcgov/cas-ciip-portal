begin;

alter table ggircs_portal.product disable trigger _protect_read_only_products;

with rows as (
insert into ggircs_portal.product(id, product_name, units, product_state, requires_emission_allocation, requires_product_amount, is_read_only)
overriding system value
values
(1, 'Aluminum Smelting','tonnes of aluminum produced','published', true, true, false),
(2, 'Cannabis (flowers and seedlings) grown under cover', 'hectares of growing space', 'published',true, true, false),
(3, 'Cement equivalent', 'tonnes of cement equivalent','published',true, true, false),
(4, 'Centrifugal Compression ','MWh','published',true, true, false),
(5, 'Chemical Pulp', 'bone-dry tonnes','published' ,true, true, false),
(6, 'Copper equivalent (open pit)','tonnes of Copper equivalent','published' ,true, true, false),
(7, 'Copper equivalent (underground)','tonnes of Copper equivalent','published' ,true, true, false),
(8, 'Food (including seedlings) grown under cover', 'hectares of growing space', 'published' ,true, true, false),
(9, 'District energy (heat)', 'MWh','published' ,true, true, false),
(10, 'Exported electricity', 'MWh', 'published' ,true, true, true),
(11, 'Exported heat', 'GJ', 'published' ,true, true, true),
(12, 'Gold equivalent','tonnes of gold equivalent','published', true, true, false),
(13, 'Forged steel balls (grinding media <3.5")','tonnes','published', true, true, false),
(14, 'Forged steel balls (grinding media >4")','tonnes','published', true, true, false),
(15, 'Gypsum wallboard','square meters','published', true, true, false),
(16, 'Lime', 'tonnes','published', true, true, false),
(17, 'Hot dip galvanizing','tonnes of wire processed','published' ,true, true, false),
(18, 'Hydrogen Peroxide (H2O2)', 'tonnes of pure (100%) Hydrogen Peroxide produced','published' ,true, true, false),
(19, 'Lead-Zinc Smelting','tonnes of lead and zinc','published',true, true, false),
(20, 'Sweet Gas Plants','e3m3OE','published', true, true, false),
(21, 'Sour Gas Plants','e3m3OE','published', true, true, false),
(22, 'Sugar (liquid)', 'tonnes','published', true, true, false),
(23, 'Sugar (solid)', 'tonnes','published', true, true, false),
(24, 'Liquefied Natural Gas (LNG)', 'tonnes', 'published', true, true, false),
(25, 'Lumber', 'cubic meters', 'published', true, true, false),
(26, 'Coal','tonnes','published', true, true, false),
(27, 'Veneer', 'cubic meters', 'published', true, true, false),
(28, 'Wood Panels (Plywood, MDF, OSB)', 'cubic meters','published', true, true, false),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','published', true, true, false),
(30, 'Wire draw production','tonnes of wire processed','published', true, true, false),
(31, 'Reciprocating Compression ','MWh','published', true, true, false),
(32, 'Silver Equivalent','tonnes of Silver equivalent','published', true, true, false),
(33, 'Petroleum Refining','BC refining complexity factor unit','published',true, true, false),
(34, 'Wood pellets', 'bone dry tonnes','published', true, true, false),
(35, 'Wood chips', 'bone dry tonnes','published', true, true, false),
(36, 'Waste rendering', 'tonnes','published', true, true, false),
(37, 'Purchased electricity', 'GWh', 'published' ,true, true, true),
(38, 'Purchased heat', 'GJ', 'published' ,true, true, true),
(39, 'Generated electricity', 'GWh', 'published' ,true, true, true),
(40, 'Generated heat', 'GJ', 'published' ,true, true, true),
(41, 'Emissions from EIOs', 'GJ', 'published' ,true, true, true)
on conflict(id) do update
set
product_name=excluded.product_name,
units=excluded.units,
product_state=excluded.product_state,
requires_emission_allocation=excluded.requires_emission_allocation,
requires_product_amount=excluded.requires_product_amount,
is_read_only=excluded.is_read_only
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product' from rows;

select setval from
setval('ggircs_portal.product_id_seq', (select max(id) from ggircs_portal.product), true)
where setval = 0;

alter table ggircs_portal.product enable trigger _protect_read_only_products;

commit;
