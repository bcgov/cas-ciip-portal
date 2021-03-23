-- Deploy ggircs-portal:function_ciip_user_certification_requests to pg
-- requires: table_ciip_user
-- requires: table_certification_url
-- requires: table_application

begin;

  create or replace function ggircs_portal.ciip_user_has_certification_requests(
    ciip_user ggircs_portal.ciip_user
  )
  returns boolean
  as
  $body$
    declare
    begin
      if (select count(*) from ggircs_portal.certification_url where certifier_email = ciip_user.email_address) = 0 then
        return false;
      else
        return true;
      end if;
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.ciip_user_has_certification_requests to ciip_administrator, ciip_analyst, ciip_industry_user;

  comment on function ggircs_portal.ciip_user_has_certification_requests is 'Computed column true if the user has certification requests attached to their email';

commit;
