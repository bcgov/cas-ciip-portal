-- Deploy ggircs-portal:tables/session to pg
-- requires: schema_ggircs_portal_private

begin;

create table ggircs_portal_private.session (
  sid varchar(4093) not null collate "default",
  sess json not null,
  expire timestamp(6) not null
)
with (oids=false);

alter table ggircs_portal_private.session
  add constraint ggircs_portal_private_session_pkey primary key (sid) not deferrable initially immediate;

create index ggircs_portal_private_idx_session_expire
  on ggircs_portal_private.session(expire);

grant all on ggircs_portal_private.session to public;

comment on table ggircs_portal_private.session is 'The backing store for connect-pg-simple to store express session data';
comment on column ggircs_portal_private.session.sid is 'The value of the symmetric key encrypted connect.sid cookie';
comment on column ggircs_portal_private.session.sess is 'The express session middleware object picked as json containing the jwt';
comment on column ggircs_portal_private.session.expire is 'The timestamp after which this session object will be garbage collected';

commit;
