set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

/** SETUP **/
set jwt.claims.given_name = 'test-given-name';
set jwt.claims.family_name = 'test-family-name';
set jwt.claims.email = 'test-email';
set jwt.claims.broker_session_id = 'test-broker';
set jwt.claims.priority_group = 'test-priority';
set jwt.claims.bceid_business_name = 'test-bceid-business';

select current_setting('jwt.claims.bceid_business_name');
select bceid_business_name from ggircs_portal.session();

select plan(2);

select is (
  ggircs_portal.session(),
  null,
  'returns null if jwt.claims.sub is null'
);

set jwt.claims.sub = 'test-sub';

select results_eq(
  $$
    select sub, given_name, family_name, email, broker_session_id, priority_group, bceid_business_name
    from ggircs_portal.session()
  $$,
  $$
    values (
      'test-sub'::text,
      'test-given-name'::text,
      'test-family-name'::text,
      'test-email'::text,
      'test-broker'::text,
      'test-priority'::text,
      'test-bceid-business'::text
    )
  $$,
  'session function returns proper values if sub is not null' );

select finish();
rollback;
