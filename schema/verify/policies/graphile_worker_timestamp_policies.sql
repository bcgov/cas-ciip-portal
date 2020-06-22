-- Verify ggircs-portal:policies/graphile_worker_timestamp_policies on pg

begin;

select exists(
  select * from pg_policy
    where polname = 'all_select'
    and polrelid = (select 'ggircs_portal_private.graphile_worker_timestamp'::regclass::oid)
);

select exists(
  select * from pg_policy
    where polname = 'all_insert'
    and polrelid = (select 'ggircs_portal_private.graphile_worker_timestamp'::regclass::oid)
);

rollback;
