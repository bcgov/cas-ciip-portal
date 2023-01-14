-- Deploy ggircs-portal:trigger_functions/user_uuid_immutable_with_flag to pg


begin;

create or replace function ggircs_portal_private.user_uuid_immutable_with_flag_set()
returns trigger as $$
begin
  if not old.allow_uuid_update then
    raise exception 'uuid cannot be updated when allow_uuid_update is false';
  end if;
  return new;
end;
$$ language plpgsql;

grant execute on function ggircs_portal_private.user_uuid_immutable_with_flag_set to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.user_uuid_immutable_with_flag_set()
  is $$
    A trigger that raises an exception if the uuid of a user is being updated with the allow_uuid_update flag set to false
  $$;

commit;
