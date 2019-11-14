-- Revert ggircs-portal:table_emission_category_gas from pg

begin;

drop table ggircs_portal.emission_category_gas;

commit;
