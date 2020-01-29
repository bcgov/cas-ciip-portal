set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(8);

select has_role( 'ciip_administrator', 'role ciip_administrator exists' );
select isnt_superuser(
    'ciip_administrator',
    'ciip_administrator should not be a super user'
);
select has_role( 'ciip_analyst', 'role ciip_analyst exists' );
select isnt_superuser(
    'ciip_analyst',
    'ciip_analyst should not be a super user'
);
select has_role( 'ciip_industry_user', 'role ciip_industry user exists' );
select isnt_superuser(
    'ciip_industry_user',
    'ciip_industry_user should not be a super user'
);
select has_role( 'ciip_guest', 'role ciip_guest exists' );
select isnt_superuser(
    'ciip_guest',
    'ciip_guest should not be a super user'
);

select finish();
rollback;
