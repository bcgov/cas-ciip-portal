-- Deploy ggircs-portal:database_functions/prune_orphan_swrs_orgs_and_facilities to pg
-- requires: schema_ggircs_portal_private

-- This function looks at all the ciip portal organisations and facilities, and removes them if their swrs corresponding entry is not found.
-- Items which don't have a swrs id were added in CIIP and should be kept.

begin;

create or replace function ggircs_portal_private.prune_orphan_swrs_orgs_and_facilities()
returns void as
$function$

  -- deleting facilities with no swrs org
  -- this will fail if there are applications depending on any of these facilities
  with orphan_ciip_facility_ids as (
    select ciip_fac.id from ggircs_portal.facility ciip_fac
    left join swrs.facility swrs_fac
    on ciip_fac.swrs_facility_id=swrs_fac.swrs_facility_id
    where ciip_fac.swrs_facility_id is not null
    and swrs_fac.swrs_facility_id is null
  )
  delete from ggircs_portal.facility
  where id in (select id from orphan_ciip_facility_ids);


  -- deleting ciip_user_organisation records, then organisations
  with orphan_ciip_org_ids as (
    select ciip_org.id
    from ggircs_portal.organisation ciip_org
    left join swrs.organisation swrs_org
    on swrs_org.swrs_organisation_id=ciip_org.swrs_organisation_id
    where ciip_org.swrs_organisation_id is not null
    and swrs_org.swrs_organisation_id is null
  ),
  deleted_user_orgs as (
    delete from ggircs_portal.ciip_user_organisation
    where organisation_id in (select id from orphan_ciip_org_ids)
  )
  delete from ggircs_portal.organisation
  where id in (select id from orphan_ciip_org_ids);

$function$ language sql;

select ggircs_portal_private.prune_orphan_swrs_orgs_and_facilities();

commit;
