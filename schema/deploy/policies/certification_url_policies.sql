-- Deploy ggircs-portal:policies/certification_url_policies to pg
-- requires: tables/certification_url

begin;

-- ciip_industry_user (certifier) Policies
drop policy certifier_select_certification_url on ggircs_portal.certification_url;
drop policy certifier_update_certification_url on ggircs_portal.certification_url;


commit;
