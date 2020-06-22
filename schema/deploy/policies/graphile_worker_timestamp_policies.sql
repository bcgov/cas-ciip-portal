-- Deploy ggircs-portal:policies/graphile_worker_timestamp_policies to pg
-- requires: tables/graphile_worker_timestamp

begin;

do
$policy$
begin

create policy all_select on ggircs_portal_private.graphile_worker_timestamp using (true);
create policy all_insert on ggircs_portal_private.graphile_worker_timestamp using(true) with check (true);

end
$policy$;

commit;
