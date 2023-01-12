-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

begin;

drop trigger user_uuid_immutable_with_flag on ggircs_portal.ciip_user;

alter table ggircs_portal.ciip_user alter column uuid type uuid using uuid::uuid;

alter index ggircs_portal.user_provider_uuid rename to user_email_address_uuuid;

comment on column ggircs_portal.ciip_user.uuid is 'Universally Unique ID for the user used for auth';

commit;
