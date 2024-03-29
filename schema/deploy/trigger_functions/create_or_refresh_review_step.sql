-- Deploy ggircs-portal:trigger_functions/create_or_refresh_review_step to pg
-- requires: tables/application_review_step

begin;

create or replace function ggircs_portal_private.create_or_refresh_review_step()
  returns trigger as $$

declare
  temp_row record;

begin

  if new.version_number > 0 then

    -- If review steps exist, refresh the review steps by setting is_complete=false
    if (select exists (select id from ggircs_portal.application_review_step ars where ars.application_id = new.application_id limit 1)) then
      update ggircs_portal.application_review_step ars set is_complete=false where ars.application_id = new.application_id;
    -- Create new review steps if none exist (first submission)
    else
      for temp_row in
        select id, step_name from ggircs_portal.review_step where is_active = true
      loop
        insert into ggircs_portal.application_review_step(application_id, review_step_id)
          values (new.application_id, temp_row.id);
      end loop;
    end if;
  end if;

  return new;
end;
$$ language plpgsql volatile security definer;

grant execute on function ggircs_portal_private.create_or_refresh_review_step to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.create_or_refresh_review_step()
  is $$
  a trigger to create a review step for an application if it does not exist else reset the is_complete value to false
  when the application_revision_status changes to submitted.
  example usage:

  create table some_schema.some_table (
    ...
    application_revision_status ggircs_portal.application_revision_status
  );
  create trigger _create_or_refresh_review_step
    before insert of application_revision_status on some_schema.some_table
    for each row
    execute procedure ggircs_portal_private.create_or_refresh_review_step();
  $$;

commit;
