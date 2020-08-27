set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(4);

truncate ggircs_portal.certification_url restart identity;
truncate ggircs_portal.ciip_user_organisation restart identity;
alter table ggircs_portal.certification_url disable trigger _certification_request_email;
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select has_function(
  'ggircs_portal', 'ciip_user_has_certification_requests', array['ggircs_portal.ciip_user'],
  'Function ggircs_portal.ciip_user_has_certification_requests should exist'
);

insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (1,2,'certifier@certi.fy');

select is(
  (
    with record as (select row(ciip_user.*)::ggircs_portal.ciip_user from ggircs_portal.ciip_user where email_address = 'ciip@mailinator.com')
    select ggircs_portal.ciip_user_has_certification_requests((select * from record))
  ),
  'false'::boolean,
  'ciip_user_has_certification_requests returns false if no certification requests exist for the user passed to the function'
);

select is(
  (
    with record as (select row(ciip_user.*)::ggircs_portal.ciip_user from ggircs_portal.ciip_user where email_address = 'certifier@certi.fy')
    select ggircs_portal.ciip_user_has_certification_requests((select * from record))
  ),
  'true'::boolean,
  'ciip_user_has_certification_requests returns true if certification requests exist for the user passed to the function'
);

update ggircs_portal.ciip_user set email_address = 'CERTIFIER@certi.fy' where email_address = 'certifier@certi.fy';

select is(
  (
    with record as (select row(ciip_user.*)::ggircs_portal.ciip_user from ggircs_portal.ciip_user where email_address = 'CERTIFIER@certi.fy')
    select ggircs_portal.ciip_user_has_certification_requests((select * from record))
  ),
  'true'::boolean,
  'ciip_user_has_certification_requests is case insensitive'
);

select finish();

rollback;
