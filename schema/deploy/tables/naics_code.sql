-- Deploy ggircs-portal:tables/naics_code to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.naics_code (
  id integer primary key generated always as identity,
  naics_code varchar(1000) not null,
  ciip_sector varchar(1000),
  naics_description varchar(10000) not null
);

create unique index naics_naics_code_uindex on ggircs_portal.naics_code(naics_code);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'naics_code',
  add_create := true,
  add_update := true,
  add_delete := true);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'naics_code', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'naics_code', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_analyst');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'naics_code', 'ciip_industry_user');

end
$grant$;

comment on table ggircs_portal.naics_code is E'@omit create,delete\nTable contains naics codes & their descriptions. NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics_code.id is 'Primary key for naics_code table';
comment on column ggircs_portal.naics_code.naics_code is 'The naics_code, NAICS is an acronym for North American Industry Classification System and is used to categorize industrial operations into sectors.';
comment on column ggircs_portal.naics_code.ciip_sector is 'The sector this naics code belongs to according to the CleanBC Industrial Incentive Program';
comment on column ggircs_portal.naics_code.naics_description is 'The plain text description of the NAICS classification';
comment on column ggircs_portal.naics_code.created_at is 'The timestamp of when this naics_code row was created';
comment on column ggircs_portal.naics_code.created_by is 'The id of the user who created this row, references ciip_user(id)';
comment on column ggircs_portal.naics_code.updated_at is 'The timestamp of when this naics_code row was last updated';
comment on column ggircs_portal.naics_code.updated_by is 'The id of the user who last updated this row, references ciip_user(id)';;
comment on column ggircs_portal.naics_code.deleted_at is 'The timestamp of when this naics_code row was archived';
comment on column ggircs_portal.naics_code.deleted_by is 'The id of the user who archived this row, references ciip_user(id)';

-- Insert seed data
insert into ggircs_portal.naics_code(naics_code, ciip_sector, naics_description)
values
('111419', 'Greenhouses', 'Food Crops Grown Under Cover'),
('211110', 'Oil and Gas extraction', 'Oil and Gas extraction (except oil sands)'),
('212114', 'Coal Mining', 'Bituminous Coal Mining'),
('212220', 'Metal Mining', 'Gold and Silver Ore Mining'),
('212231', 'Metal Mining', 'Lead-zinc ore mining'),
('212233', 'Metal Mining', 'Copper-Zinc Ore Mining'),
('213118', 'Oil and Gas Extraction', 'Services to oil and gas extraction'),
('221330', 'District Energy', 'Steam and Air-Conditioning Supply'),
('311310', 'Food Industry', 'Sugar Manufacturing'),
('311614', 'Rendering and Animal By-Products', 'Rendering and Meat By-product Processing'),
('321111', 'Wood Products', 'Sawmills except Shingle and Shake Mills'),
('321212', 'Wood Products', 'Softwood Veneer and Plywood Mills'),
('321216', 'Wood Products', 'Particle board and fibreboard mills'),
('321999', 'Wood Products', 'All other miscellaneous wood product manufacturing'),
('322111', 'Pulp and Paper', 'Mechanical Pulp Mills'),
('322112', 'Pulp and Paper', 'Chemical Pulp Mills'),
('322121', 'Pulp and Paper', 'Paper (except Newsprint) Mills'),
('322122', 'Pulp and Paper', 'Newsprint Mills'),
('324110', 'Oil Refining', 'Petroleum Refineries'),
('325189', 'Chemicals', 'Basic Inorganic Chemical Manufacturing'),
('327310', 'Non-Metallic Materials', 'Cement Manufacturing'),
('327410', 'Non-Metallic Materials', 'Lime Manufacturing'),
('327420', 'Non-Metallic Materials', 'Gypsum Product Manufacturing'),
('331222', 'Metallic Materials', 'Steel Wire Drawing'),
('331313', 'Metallic Materials', 'Primary Production of Alumina and Aluminum'),
('331410', 'Metallic Materials', 'Non-Ferrous Metal (except Aluminum) Smelting and Refining'),
('331511', 'Metallic Materials', 'Iron Foundries'),
('412110', 'Oil and Gas Transportation and Distribution', 'Petroleum Product Wholesaler-Distributors'),
('486210', 'Oil and Gas Transportation and Distribution', 'Pipeline Transportation of Natural Gas');

commit;
