-- 2021-07-12 11:40:10.787 PDT [29575] ERROR:  operator does not exist: ciip_product_state = character varying at character 186
-- 2021-07-12 11:40:10.787 PDT [29575] HINT:  No operator matches the given name and argument types. You might need to add explicit type casts.
-- 2021-07-12 11:40:10.787 PDT [29575] STATEMENT:  -- Metabase:: userID: 1 queryType: native queryHash: c3b2b9da2cc0d5f738b1ff17c279f65160044d1434a875d3f020d3882de1fb74
-- 	select product_name from ggircs_portal.product where product_state = $1

set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select operators_are(
  'public',
  ARRAY[
    '=(ggircs_portal.ciip_application_revision_status,text) RETURNS boolean',
    '=(ggircs_portal.ciip_product_state,text) RETURNS boolean',
    '=(ggircs_portal.ciip_user_organisation_status,text) RETURNS boolean',
    '=(ggircs_portal.review_comment_type,text) RETURNS boolean',
    '<>(ggircs_portal.ciip_application_revision_status,text) RETURNS boolean',
    '<>(ggircs_portal.ciip_product_state,text) RETURNS boolean',
    '<>(ggircs_portal.ciip_user_organisation_status,text) RETURNS boolean',
    '<>(ggircs_portal.review_comment_type,text) RETURNS boolean'
  ],
  'Added enum operators exist for Metabase.'
);

prepare prepared_enum_test_eq (text) AS select id from ggircs_portal.product where product_state = $1;
select lives_ok( 'execute prepared_enum_test_eq(''published'')', 'should not complain that the = operator does not exist');

prepare prepared_enum_test_neq (text) AS select id from ggircs_portal.product where product_state != $1;
select lives_ok( 'execute prepared_enum_test_neq(''published'')', 'should not complain that the <> operator does not exist');

select finish();
rollback;
