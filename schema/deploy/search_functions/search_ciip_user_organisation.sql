-- Deploy ggircs-portal:function_search_ciip_user_organisation to pg
-- requires: table_user_organisation

begin;

drop function ggircs_portal.search_ciip_user_organisation;

commit;
