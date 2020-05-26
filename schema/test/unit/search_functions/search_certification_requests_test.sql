set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

truncate ggircs_portal.certification_url restart identity;
alter table ggircs_portal.certification_url disable trigger _certification_request_email;
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select has_function(
  'ggircs_portal', 'search_certification_requests', array['text[]', 'text[]', 'text', 'text', 'int'],
  'Function ggircs_portal.search_certification_requests should exist'
);

insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (1,2,'ciip@mailinator.com');
insert into ggircs_portal.certification_url(application_id, version_number, certifier_email) values (1,2,'certifier@certi.fy');

select is(
  (
    select certifier_email from ggircs_portal.search_certification_requests(ARRAY['facility_name'], ARRAY['a'], 'facility_name', 'asc', '0')
  ),
  'ciip@mailinator.com'::varchar(1000),
  'search_certification_requests returns only the certification_url results for the logged in user'
);

select finish();

rollback;
