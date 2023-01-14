begin;
select plan(6);

select has_function(
  'ggircs_portal', 'create_or_update_ciip_user',
  'Function create_or_update_ciip_user should exist'
);

-- Add a user via create_ggircs_user_from_session()
set jwt.claims.sub to 'this-is-a-sub-value@an-identity-provider';
select ggircs_portal.create_or_update_ciip_user('first','last','tester','123-456-6780');

select isnt_empty (
  $$
    select * from ggircs_portal.ciip_user where uuid = 'this-is-a-sub-value@an-identity-provider';
  $$,
  'create_or_update_ciip_user() successfully creates a user'
);

set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
set jwt.claims.email to 'bob.loblaw@gov.bc.ca';

-- Returns the user that was created
select results_eq(
  $$
    select session_sub, first_name, last_name, email_address from ggircs_portal.create_or_update_ciip_user('first','last','tester','123-456-6780');
  $$,
  $$
    values (
      '11111111-1111-1111-1111-111111111111'::varchar,
      'Bob'::varchar,
      'Loblaw'::varchar,
      
    );
  $$,
  'Returns the user that was created'
);


-- Adds a user if the email doesn't exist in the system
select results_eq (
  $$
    select first_name, last_name, email_address, allow_sub_update
    from ggircs_app.ggircs_user
    where session_sub = '11111111-1111-1111-1111-111111111111'
  $$,
  $$
  values (
    'Bob'::varchar(1000),
    'Loblaw'::varchar(1000),
    'bob.loblaw@gov.bc.ca'::varchar(1000),
    false
  )
  $$,
  'create_ggircs_user_from_session() successfully creates a user when there are none in the system, with the allow_sub_update flag set to false'
);

-- Updates the sub if the email already exists and we allow the sub update, and disallows sub update from then on
update ggircs_app.ggircs_user set allow_sub_update = true where session_sub = '11111111-1111-1111-1111-111111111111';

set jwt.claims.sub to 'ABCDEF@provider';
set jwt.claims.given_name to 'Bob';
set jwt.claims.family_name to 'Loblaw';
set jwt.claims.email to 'bob.loblaw@gov.bc.ca';

select ggircs_app.create_ggircs_user_from_session();

select results_eq (
  $$
    select first_name, last_name, email_address, allow_sub_update
    from ggircs_app.ggircs_user
    where session_sub = 'ABCDEF@provider'::varchar
  $$,
  $$
  values (
    'Bob'::varchar(1000),
    'Loblaw'::varchar(1000),
    'bob.loblaw@gov.bc.ca'::varchar(1000),
    false
  )
  $$,
  'create_ggircs_user_from_session() successfully updates the sub if the users already exists, and sets allow_sub_update to false'
);

-- Throws if we try to change the sub on a user that doesn't have the flag set
set jwt.claims.sub to 'changed@new_provider';
set jwt.claims.given_name to 'Bob';
set jwt.claims.family_name to 'Loblaw';
set jwt.claims.email to 'bob.loblaw@gov.bc.ca';

select throws_like (
  $$
    select ggircs_app.create_ggircs_user_from_session();
  $$,
  'session_sub cannot be updated when allow_sub_update is false',
  'throws if the user has a new sub for an existing email address, and the allow_sub_update flag is set to false'
);


select finish();
rollback;
