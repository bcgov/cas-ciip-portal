-- Verify ggircs-portal:2022_01_16_keycloak_gold_reject_all_organisation_membership on pg

begin;

  do $$
    begin
      assert (
        select count(*) = 0
        from ggircs_portal.ciip_user_organisation
        where status != 'rejected'
      ), 'all the ciip_user_organisation records have been rejected after this migration';
    end;
  $$;

rollback;
