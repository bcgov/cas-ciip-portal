set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select * from no_plan();

-- Table exists
select has_table(
  'ggircs_portal', 'fuel_naics',
  'ggircs_portal.fuel_naics should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'fuel_naics', 'id',
  'fuel_naics has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'fuel_naics', 'fuel_id',
  'fuel_naics has foreign key fuel_id'
);

select col_is_fk(
  'ggircs_portal', 'fuel_naics', 'naics_id',
  'fuel_naics has foreign key naics_id'
);

select has_index(
  'ggircs_portal', 'fuel_naics', 'fuel_naics_fuel_id_fkey',
  'fuel_naics table has an index on the fuel_id fkey column'
);

select has_index(
  'ggircs_portal', 'fuel_naics', 'fuel_naics_naics_id_fkey',
  'fuel_naics table has an index on the naics_id fkey column'
);


-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.fuel(name, swrs_fuel_mapping_id) values ('fuel 1', 1), ('fuel 2', 2);
insert into ggircs_portal.naics(naics_code, naics_description) values ('1234', 'naics 1'), ('9999', 'naics 2');
insert into ggircs_portal.fuel_naics(fuel_id, naics_id) values (1,1);

-- Row level security tests --

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select f.name from ggircs_portal.fuel_naics fn
    join ggircs_portal.fuel f
    on fn.fuel_id = f.id;
  $$,
  ARRAY['fuel 1'::varchar(1000)],
    'ciip_administrator can select data using the fuel_naics through-table'
);

select lives_ok(
  $$
    insert into ggircs_portal.fuel_naics (fuel_id, naics_id)
    values (2, 2);
  $$,
    'ciip_administrator can insert data in fuel_naics table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.fuel_naics fn
    join ggircs_portal.naics n
    on fn.naics_id = n.id
    and fn.id=2;
  $$,
    ARRAY['naics 2'::varchar(10000)],
    'Data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.fuel_naics set naics_id=2 where naics_id=1;
  $$,
    'ciip_administrator can change data in fuel_naics table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.fuel_naics fn
    join ggircs_portal.naics n
    on fn.naics_id = n.id
    and fn.id =1;
  $$,
    ARRAY['naics 2'::varchar(10000)],
    'Data was updated by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_naics;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_naics'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select f.name from ggircs_portal.fuel_naics fn
    join ggircs_portal.fuel f
    on fn.fuel_id = f.id
    and f.id =1;
  $$,
  ARRAY['fuel 1'::varchar(1000)],
    'Industry User can select data using the fuel_naics through-table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel_naics(fuel_id, naics_id) values (3,3);
  $$,
  'permission denied%',
    'Industry User cannot insert into ggircs_portal.fuel_naics'
);

select throws_like(
  $$
    update ggircs_portal.fuel_naics set fuel_id = 3 where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update ggircs_portal.fuel_naics'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_naics;
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_naics'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select f.name from ggircs_portal.fuel_naics fn
    join ggircs_portal.fuel f
    on fn.fuel_id = f.id
    and f.id =1;
  $$,
  ARRAY['fuel 1'::varchar(1000)],
    'Analyst can select data using the fuel_naics through-table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel_naics(fuel_id, naics_id) values (3,3);
  $$,
  'permission denied%',
    'Analyst cannot insert into ggircs_portal.fuel_naics'
);

select throws_like(
  $$
    update ggircs_portal.fuel_naics set fuel_id = 3 where id=1;
  $$,
  'permission denied%',
    'Analyst cannot update ggircs_portal.fuel_naics'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_naics;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table_naics'
);

select finish();
rollback;
