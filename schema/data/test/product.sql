begin;

alter table ggircs_portal.product disable trigger _protect_read_only_products;

with rows as (
insert into ggircs_portal.product(id, product_name, units, product_state, requires_emission_allocation, requires_product_amount, is_read_only)
overriding system value
values
(8, 'Aluminum Smelting','tonnes of aluminum produced','published', true, true, false),
(9, 'Cannabis (flowers and seedlings) grown under cover', 'hectares of growing space', 'published',true, true, false),
(10, 'Cement equivalent', 'tonnes of cement equivalent','published',true, true, false),
(11, 'Centrifugal Compression ','MWh','published',true, true, false),
(12, 'Chemical Pulp', 'bone-dry tonnes','published' ,true, true, false),
(13, 'Copper equivalent (open pit)','tonnes of Copper equivalent','published' ,true, true, false),
(14, 'Copper equivalent (underground)','tonnes of Copper equivalent','published' ,true, true, false),
(15, 'Food (including seedlings) grown under cover', 'hectares of growing space', 'published' ,true, true, false),
(16, 'District energy (heat)', 'MWh','published' ,true, true, false),
(17, 'Gold equivalent','tonnes of gold equivalent','published', true, true, false),
(18, 'Forged steel balls (grinding media <3.5")','tonnes','published', true, true, false),
(19, 'Forged steel balls (grinding media >4")','tonnes','published', true, true, false),
(20, 'Gypsum wallboard','square meters','published', true, true, false),
(21, 'Lime', 'tonnes','published', true, true, false),
(22, 'Hot dip galvanizing','tonnes of wire processed','published' ,true, true, false),
(23, 'Hydrogen Peroxide (H2O2)', 'tonnes of pure (100%) Hydrogen Peroxide produced','published' ,true, true, false),
(24, 'Lead-Zinc Smelting','tonnes of lead and zinc','published',true, true, false),
(25, 'Sweet Gas Plants','e3m3OE','published', true, true, false),
(26, 'Sour Gas Plants','e3m3OE','published', true, true, false),
(27, 'Sugar (liquid)', 'tonnes','published', true, true, false),
(28, 'Sugar (solid)', 'tonnes','published', true, true, false),
(29, 'Liquefied Natural Gas (LNG)', 'tonnes', 'published', true, true, false),
(30, 'Lumber', 'cubic meters', 'published', true, true, false),
(31, 'Coal','tonnes','published', true, true, false),
(32, 'Veneer', 'cubic meters', 'published', true, true, false),
(33, 'Wood Panels (Plywood, MDF, OSB)', 'cubic meters','published', true, true, false),
(34, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','published', true, true, false),
(35, 'Wire draw production','tonnes of wire processed','published', true, true, false),
(36, 'Reciprocating Compression ','MWh','published', true, true, false),
(37, 'Silver Equivalent','tonnes of Silver equivalent','published', true, true, false),
(38, 'Petroleum Refining','BC refining complexity factor unit','published',true, true, false),
(39, 'Wood pellets', 'bone dry tonnes','published', true, true, false),
(40, 'Wood chips', 'bone dry tonnes','published', true, true, false),
(41, 'Waste rendering', 'tonnes','published', true, true, false)

-- NOTE: Any changes to this file affects prod/energy_product.sql.
--       Remember to update the IDs as necessary in that file as well.
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
