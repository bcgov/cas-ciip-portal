-- Deploy ggircs-portal:computed_columns/ciip_user_organisation_email_address to pg
-- requires: tables/ciip_user_organisation

begin;

create or replace function ggircs_portal.ciip_user_organisation_email_address(cuo ggircs_portal.ciip_user_organisation)
  returns varchar
  as $$
    select email_address from ggircs_portal.ciip_user cu where cu.id = cuo.user_id;
  $$ language sql stable;

comment on function ggircs_portal.ciip_user_organisation_email_address(ggircs_portal.ciip_user_organisation) is E'@sortable\nThis function is a wrapper to return email_address from the ciip_user object as a scalar';

commit;
