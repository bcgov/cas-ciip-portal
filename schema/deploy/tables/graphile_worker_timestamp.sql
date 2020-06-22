-- Deploy ggircs-portal:tables/graphile_worker_timestamp to pg
-- requires: schema_ggircs_portal_private

begin;

create table ggircs_portal_private.graphile_worker_timestamp (
    id integer primary key generated always as identity,
    called_at timestamptz not null
);

grant select, insert on ggircs_portal_private.graphile_worker_timestamp to ciip_administrator;
grant select, insert on ggircs_portal_private.graphile_worker_timestamp to ciip_analyst;
grant select, insert on ggircs_portal_private.graphile_worker_timestamp to ciip_industry_user;
grant select, insert on ggircs_portal_private.graphile_worker_timestamp to ciip_guest;

alter table ggircs_portal_private.graphile_worker_timestamp enable row level security;

comment on table ggircs_portal_private.graphile_worker_timestamp is 'Table of timestamped calls to grahpile_worker.addjob()';
comment on column ggircs_portal_private.graphile_worker_timestamp.id is 'Unique ID for the timestamp';
comment on column ggircs_portal_private.graphile_worker_timestamp.called_at is 'Timestamped call time of the function';

commit;
