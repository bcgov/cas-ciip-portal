-- Deploy ggircs-portal:queries/validate_current_user to pg

begin;

create or replace function ggircs_portal.validate_current_user()
  returns boolean
  as $$

    with jwt as (select * from ggircs_portal.session())
    select not exists
        (select * from ggircs_portal.ciip_user where
                email_address = (select email from jwt)
            and uuid != (select sub from jwt )
            and allow_uuid_update = false
            and jwt.bceid_business_name is null)

  $$ language sql stable security definer;

grant execute on function ggircs_portal.validate_current_user to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
