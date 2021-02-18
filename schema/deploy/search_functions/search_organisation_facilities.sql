-- Deploy ggircs-portal:function_search_organisation_facilities to pg
-- requires: table_facility

begin;

drop function ggircs_portal.search_organisation_facilities;

commit;
