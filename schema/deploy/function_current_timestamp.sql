-- Deploy ggircs-portal:function_current_time to pg
-- requires: schema_ggircs_portal

begin;

drop function ggircs_portal.current_timestamp();

commit;
