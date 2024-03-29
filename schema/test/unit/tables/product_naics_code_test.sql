set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(20);

-- Table exists
select has_table(
  'ggircs_portal', 'product_naics_code',
  'ggircs_portal.product_naics_code should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'product_naics_code', 'id',
  'product_naics_code has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'product_naics_code', 'product_id',
  'product_naics_code has foreign key product_id'
);

select col_is_fk(
  'ggircs_portal', 'product_naics_code', 'naics_code_id',
  'product_naics_code has foreign key naics_code_id'
);

select has_index(
  'ggircs_portal', 'product_naics_code', 'product_naics_code_product_id_fkey',
  'product_naics_code table has an index on the product_id fkey column'
);

select has_index(
  'ggircs_portal', 'product_naics_code', 'product_naics_code_naics_code_id_fkey',
  'product_naics_code table has an index on the naics_code_id fkey column'
);


-- Test Setup
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
insert into ggircs_portal.product(product_name, product_state) values ('product 1', 'published'), ('product 2', 'published');
insert into ggircs_portal.naics_code(naics_code, naics_description) values ('1234', 'naics 1'), ('9999', 'naics 2');
insert into ggircs_portal.product_naics_code(product_id, naics_code_id) values (1,1);

-- Row level security tests --

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select p.product_name from ggircs_portal.product_naics_code pn
    join ggircs_portal.product p
    on pn.product_id = p.id;
  $$,
  ARRAY['product 1'::varchar(1000)],
    'ciip_administrator can select data using the product_naics_code through-table'
);

select lives_ok(
  $$
    insert into ggircs_portal.product_naics_code (product_id, naics_code_id)
    values (2, 2);
  $$,
    'ciip_administrator can insert data in product_naics_code table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.product_naics_code pn
    join ggircs_portal.naics_code n
    on pn.naics_code_id = n.id
    and pn.id=2;
  $$,
    ARRAY['naics 2'::varchar(10000)],
    'Data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.product_naics_code set naics_code_id=2 where naics_code_id=1;
  $$,
    'ciip_administrator can change data in product_naics_code table'
);

select results_eq(
  $$
    select naics_description from ggircs_portal.product_naics_code pn
    join ggircs_portal.naics_code n
    on pn.naics_code_id = n.id
    and pn.id =1;
  $$,
    ARRAY['naics 2'::varchar(10000)],
    'Data was updated by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.product_naics_code;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_naics'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select p.product_name from ggircs_portal.product_naics_code pn
    join ggircs_portal.product p
    on pn.product_id = p.id
    and p.id =1;
  $$,
  ARRAY['product 1'::varchar(1000)],
    'Industry User can select data using the product_naics_code through-table'
);

select throws_like(
  $$
    insert into ggircs_portal.product_naics_code(product_id, naics_code_id) values (3,3);
  $$,
  'permission denied%',
    'Industry User cannot insert into ggircs_portal.product_naics_code'
);

select throws_like(
  $$
    update ggircs_portal.product_naics_code set product_id = 3 where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update ggircs_portal.product_naics_code'
);

select throws_like(
  $$
    delete from ggircs_portal.product_naics_code;
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_naics'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select p.product_name from ggircs_portal.product_naics_code pn
    join ggircs_portal.product p
    on pn.product_id = p.id
    and p.id =1;
  $$,
  ARRAY['product 1'::varchar(1000)],
    'Analyst can select data using the product_naics_code through-table'
);

select throws_like(
  $$
    insert into ggircs_portal.product_naics_code(product_id, naics_code_id) values (3,3);
  $$,
  'permission denied%',
    'Analyst cannot insert into ggircs_portal.product_naics_code'
);

select throws_like(
  $$
    update ggircs_portal.product_naics_code set product_id = 3 where id=1;
  $$,
  'permission denied%',
    'Analyst cannot update ggircs_portal.product_naics_code'
);

select throws_like(
  $$
    delete from ggircs_portal.product_naics_code;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table_naics'
);

select finish();
rollback;
