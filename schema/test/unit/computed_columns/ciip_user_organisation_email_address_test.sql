
set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'ciip_user_organisation_email_address', array['ggircs_portal.ciip_user_organisation'],
  'Function ciip_user_organisation_email_address should exist'
);

with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select pg_typeof((select ggircs_portal.ciip_user_organisation_email_address((select * from record))));

select results_eq (
  $$
    with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select pg_typeof((select ggircs_portal.ciip_user_organisation_email_address((select * from record))))
  $$,
  ARRAY['character varying'::regtype],
  'ciip_user_organisation_email_address returns scalar type varchar'
);

select results_eq (
  $$
    with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select ggircs_portal.ciip_user_organisation_email_address((select * from record))
  $$,
  ARRAY[
    (select email_address from ggircs_portal.ciip_user_organisation cuo
    join ggircs_portal.ciip_user u on cuo.user_id = u.id and cuo.id=1)::varchar],
  'ciip_user_organisation_email_address returns a operator name when passed an organisation object'
);

select finish();
rollback;
