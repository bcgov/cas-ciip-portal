set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'ciip_user_organisation_last_name', array['ggircs_portal.ciip_user_organisation'],
  'Function ciip_user_organisation_last_name should exist'
);

with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select pg_typeof((select ggircs_portal.ciip_user_organisation_last_name((select * from record))));

select results_eq (
  $$
    with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select pg_typeof((select ggircs_portal.ciip_user_organisation_last_name((select * from record))))
  $$,
  ARRAY['character varying'::regtype],
  'ciip_user_organisation_last_name returns scalar type varchar'
);

select results_eq (
  $$
    with record as (select row(ciip_user_organisation.*)::ggircs_portal.ciip_user_organisation from ggircs_portal.ciip_user_organisation where id=1)
    select ggircs_portal.ciip_user_organisation_last_name((select * from record))
  $$,
  ARRAY[
    (select last_name from ggircs_portal.ciip_user_organisation tbl
    join ggircs_portal.ciip_user cu on cu.id=tbl.user_id and tbl.id=1)::varchar],
  'ciip_user_organisation_last_name returns a last_name when passed an ciip_user_organisation object'
);

select finish();
rollback;
