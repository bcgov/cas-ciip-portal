-- Deploy ggircs-portal:mutations/create_or_update_ciip_user to pg


begin;

create or replace function ggircs_portal.create_or_update_ciip_user(
  first_name text,
  last_name text,
  occupation text,
  phone_number text
) returns ggircs_portal.ciip_user
as $function$
declare
  jwt ggircs_portal.jwt_token;
  result ggircs_portal.ciip_user;
begin

  select * from ggircs_portal.session() into jwt;

  if (select count(*) from ggircs_portal.ciip_user where uuid=jwt.sub) = 0
  then

    insert into ggircs_portal.ciip_user(
      uuid,
      first_name,
      last_name,
      email_address,
      occupation,
      phone_number,
      allow_uuid_update
    )
    values (
      jwt.sub,
      first_name,
      last_name,
      jwt.email,
      occupation,
      phone_number,
      false
    )
    on conflict(email_address) do
    update
    set uuid=excluded.uuid,
        first_name=excluded.first_name,
        last_name=excluded.last_name,
        occupation=excluded.occupation,
        phone_number=excluded.phone_number,
        allow_uuid_update=false;

  end if;

  select * from ggircs_portal.ciip_user where uuid = jwt.sub into result;
  return result;

end;

$function$ language plpgsql strict volatile security definer;

grant execute on function ggircs_portal.create_or_update_ciip_user to ciip_administrator, ciip_analyst, ciip_industry_user;
comment on function ggircs_portal.create_or_update_ciip_user is 'This custom create mutation tries to find an exising user formerly in the system, and to update it if allowed';

commit;
