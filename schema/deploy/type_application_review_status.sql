-- Deploy ggircs-portal:type_application_review_status to pg

begin;

create type ggircs_portal.application_review_status
  as enum ('pending', 'in review', 'approved', 'requested changes', 'changes submitted');

commit;
