-- Deploy ggircs-portal:computed_columns/ciip_user_organisation_last_name to pg
-- requires: tables/ciip_user_organisation

begin;

create or replace function ggircs_portal.ciip_user_organisation_last_name(cuo ggircs_portal.ciip_user_organisation)
  returns varchar
  as $$
    select last_name from ggircs_portal.ciip_user cu where cu.id = cuo.user_id;
  $$ language sql stable;

comment on function ggircs_portal.ciip_user_organisation_last_name(ggircs_portal.ciip_user_organisation) is E'@sortable\nThis function is a wrapper to return last_name from the ciip_user object as a scalar';

commit;
