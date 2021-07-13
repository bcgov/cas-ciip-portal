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
