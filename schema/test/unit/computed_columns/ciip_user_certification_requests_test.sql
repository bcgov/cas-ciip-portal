set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'ciip_user_certification_requests', array['ggircs_portal.ciip_user'],
  'Function ggircs_portal.ciip_user_certification_requests should exist'
);

insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (1,2,'ciip@mailinator.com');
insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (1,2,'certifier@certi.fy');

select is(
  (
    with record as (select row(ciip_user.*)::ggircs_portal.ciip_user from ggircs_portal.ciip_user where email_address = 'certifier@certi.fy')
    select certifier_email from ggircs_portal.ciip_user_certification_requests((select * from record))
  ),
  'certifier@certi.fy'::varchar(1000),
  'ciip_user_certification_requests returns only the certification_url results for the user specified'
);

insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (2,1,'certifier@certi.fy');

select set_eq(
  $$
    with record as (select row(ciip_user.*)::ggircs_portal.ciip_user from ggircs_portal.ciip_user where email_address = 'certifier@certi.fy')
    select count(*) from ggircs_portal.ciip_user_certification_requests((select * from record));
  $$,
  ARRAY['2'::bigint],
  'ciip_user_certification_requests returns a set of certification_url results for a user'
);

select finish();

rollback;
