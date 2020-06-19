-- Deploy ggircs-portal:tables/graphile_worker_timestamp to pg
-- requires: schema_ggircs_portal_private

begin;

create table ggircs_portal_private.graphile_worker_timestamp (
    id integer primary key generated always as identity,
    called_at timestamptz not null
);

comment on table ggircs_portal_private.graphile_worker_timestamp is 'Table of timestamped calls to grahpile_worker.addjob()';
comment on column ggircs_portal_private.graphile_worker_timestamp.id is 'Unique ID for the timestamp';
comment on column ggircs_portal_private.graphile_worker_timestamp.called_at is 'Timestamped call time of the function';

commit;
