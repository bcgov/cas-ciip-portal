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
            and allow_uuid_update = false)

  $$ language sql stable;

grant execute on function ggircs_portal.default_displayed_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
