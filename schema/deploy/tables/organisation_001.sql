-- Deploy ggircs-portal:tables/organisation_001 to pg
-- requires: tables/organisation

begin;

create unique index organisation_swrs_organisation_id_uindex on ggircs_portal.organisation(swrs_organisation_id);

commit;
