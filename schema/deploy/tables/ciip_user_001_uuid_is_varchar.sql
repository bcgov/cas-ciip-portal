-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

begin;

-- Disabling trigger before updating data in-place
alter table ggircs_portal.ciip_user disable trigger _100_timestamps;

-- Changing uuid to type varchar

-- ~~~NOTE FOR DEVELOPERS~~~
-- We are not renaming this field to `session_sub` or something more appropriate, just due to the
-- the amount of refactoring work this would require.
-- As of this migration, it's implicit that the 'uuid' means 'the authentication provider's unique identifier'
alter table ggircs_portal.ciip_user alter column uuid type varchar(1000);

alter index ggircs_portal.user_email_address_uuuid rename to user_provider_uuid;

-- Adding allow_uuid_update column
alter table ggircs_portal.ciip_user
  add column allow_uuid_update boolean not null default false;

create trigger user_uuid_immutable_with_flag
    before update of uuid on ggircs_portal.ciip_user
    for each row
    execute function ggircs_portal_private.user_uuid_immutable_with_flag_set();

do
$grant$
begin

-- Email is no longer changeable since it's the identifier for the account
revoke update (email_address) on ggircs_portal.ciip_user from ciip_administrator;
revoke update (email_address) on ggircs_portal.ciip_user from ciip_analyst;
revoke update (email_address) on ggircs_portal.ciip_user from ciip_industry_user;

end
$grant$;

update ggircs_portal.ciip_user set allow_uuid_update = true;

-- Re-enabling trigger after data update
alter table ggircs_portal.ciip_user disable trigger _100_timestamps;

-- Disabling the create mutation in favour of a custom one
comment on table ggircs_portal.ciip_user is E'@omit create\n Table containing the benchmark and eligibility threshold for a product';

comment on column ggircs_portal.ciip_user.allow_uuid_update is 'Boolean value determines whether a legacy user can be updated. Legacy users may be updated only once.';
comment on column ggircs_portal.ciip_user.uuid is 'Unique ID for the user/provider combination, defined by the single sign-on provider.';

commit;
