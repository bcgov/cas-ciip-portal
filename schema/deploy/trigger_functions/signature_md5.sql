-- Deploy ggircs-portal:trigger_functions/signature_md5 to pg
-- requires: schema_ggircs_portal_private

begin;
  create or replace function ggircs_portal_private.signature_md5()
    returns trigger as $$

  declare
    all_form_results text;
    form_result_hash text;
    temp_row record;
    user_sub uuid;
    ciip_user_id int;

  begin
    -- Get current user
    user_sub := (select sub from ggircs_portal.session());
    ciip_user_id := (select id from ggircs_portal.ciip_user as cu where cu.uuid = user_sub);

    -- Get current hash of all form results for application_revision
    for temp_row in
        select form_id from ggircs_portal.ciip_application_wizard
      loop
        all_form_results = (select concat(
                                    all_form_results,
                                    (select form_result::text
                                    from ggircs_portal.form_result fr
                                    where fr.application_id = new.application_id
                                    and fr.form_id = temp_row.form_id
                                    and fr.version_number = new.version_number)
                                  ));
      end loop;

    -- Update of application_revision_status (submitting an application)
    if (tg_argv[0] = 'submission') then
      if (tg_op = 'INSERT' and new.application_revision_status='submitted') then
        if ((select form_results_md5 from ggircs_portal.certification_url where application_id = new.application_id and version_number=new.version_number and deleted_at is null) != (select md5(all_form_results))) then
          raise exception 'current hash of form results for application % version % does not match the hash in the certification_url table', new.application_id, new.version_number;
        elsif ((select certification_signature from ggircs_portal.certification_url where application_id = new.application_id and version_number=new.version_number and deleted_at is null) is null and new.version_number > 0) then
          raise exception 'application % version % has not been signed by a certifier', new.application_id, new.version_number;
        end if;
      end if;

    -- Creating a row in certification_url
    elsif (tg_op = 'INSERT' and tg_argv[0] is null) then
      new.form_results_md5 = (select md5(all_form_results));
      -- "Delete" previous certification_urls for revision
      update ggircs_portal.certification_url set deleted_at = now(), deleted_by=ciip_user_id where application_id = new.application_id and version_number=new.version_number and created_at < new.created_at;

    -- Updating the certification_signature in certification_url
    elsif (tg_op = 'UPDATE' and tg_argv[0] is null) then
      form_result_hash = (select md5(all_form_results));
      if (new.form_results_md5 != form_result_hash) then
        raise notice 'CURRENT HASH: %, CERTIFICATION_URL HASH: %', form_result_hash, new.form_results_md5;
        raise exception 'current hash of form results for application % version % does not match the hash in the certification_url table', new.application_id, new.version_number;
      end if;
      new.certified_at = now();
      new.certified_by = ciip_user_id;
    end if;

    return new;
  end;
  $$ language plpgsql volatile;

commit;
