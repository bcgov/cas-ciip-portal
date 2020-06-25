-- Revert ggircs-portal:tables/organisation_001 from pg

begin;

-- Unique indexes cannot be dropped, migration will be rolled back by original revert

commit;
