-- Deploy ggircs-portal:function_search_application_list to pg
-- requires: table_application

begin;

drop function ggircs_portal.search_application_list;

commit;
