-- Verify ggircs-portal:policies/certification_url_policies on pg

begin;

-- Verifies if a policy doesn't exist
create or replace function throw_if_policy_exists(operation text, policy_name text, table_name_input text, role_name text)
returns boolean
as
$function$
  declare
    return_value boolean := false;
  begin
    if (ggircs_portal_private.verify_policy(operation, policy_name, table_name_input, role_name) = true) then
      return_value := true;
      raise exception 'the policy % was found', policy_name;
    end if;
  exception when others then
    if(return_value) then
      raise exception 'Policy % was found when it shouldnt have', operation;
    end if;

    return true;
  end;
$function$
language 'plpgsql' stable;


-- ciip_administrator Policies
select throw_if_policy_exists('select', 'ciip_administrator_select_certification_url', 'certification_url', 'ciip_administrator');
select throw_if_policy_exists('insert', 'ciip_administrator_insert_certification_url', 'certification_url', 'ciip_administrator');

-- ciip_analyst Policies
select throw_if_policy_exists('select', 'ciip_analyst_select_certification_url', 'certification_url', 'ciip_analyst');

-- ciip_industry_user Policies
select throw_if_policy_exists('select', 'ciip_industry_user_select_certification_url', 'certification_url', 'ciip_industry_user');
select throw_if_policy_exists('insert', 'ciip_industry_user_insert_certification_url', 'certification_url', 'ciip_industry_user');
select throw_if_policy_exists('update', 'ciip_industry_user_update_certification_url', 'certification_url', 'ciip_industry_user');

-- ciip_industry_user (certifier) Policies
select throw_if_policy_exists('select', 'certifier_select_certification_url', 'certification_url', 'ciip_industry_user');
select throw_if_policy_exists('update', 'certifier_update_certification_url', 'certification_url', 'ciip_industry_user');

rollback;
