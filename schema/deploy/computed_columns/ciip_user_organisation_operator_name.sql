-- Deploy ggircs-portal:computed_columns/ciip_user_organisation_operator_name to pg
-- requires: tables/ciip_user_organisation

begin;

create or replace function ggircs_portal.ciip_user_organisation_operator_name(cuo ggircs_portal.ciip_user_organisation)
  returns varchar
  as $$
    select operator_name from ggircs_portal.organisation o where o.id = cuo.organisation_id;
  $$ language sql stable;

comment on function ggircs_portal.ciip_user_organisation_operator_name(ggircs_portal.ciip_user_organisation) is E'@sortable\nThis function is a wrapper to return operator_name from the organisation object as a scalar';

commit;
