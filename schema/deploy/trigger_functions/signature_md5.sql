-- Deploy ggircs-portal:trigger_functions/signature_md5 to pg
-- requires: schema_ggircs_portal_private

begin;
  create or replace function ggircs_portal_private.signature_md5()
    returns trigger as $$

  declare
    form_result_hash bytea;
    temp_row record;
    user_sub uuid;
    ciip_user_id int;
    app_revision ggircs_portal.application_revision;

  begin
    -- Get current user
    user_sub := (select sub from ggircs_portal.session());
    ciip_user_id := (select id from ggircs_portal.ciip_user as cu where cu.uuid = user_sub);

    -- Get current hash of form_results
    form_result_hash := (select ggircs_portal_private.current_form_results_md5(new.application_id, new.version_number));

    -- Update of application_revision_status (submitting an application)
    if (tg_argv[0] = 'submission') then
      if (new.application_revision_status='submitted') then
        app_revision = (select row(application_revision.*) from ggircs_portal.application_revision where application_id=new.application_id and version_number=new.version_number);
        if ((select form_results_md5 from ggircs_portal.application_revision_certification_url(app_revision)) != form_result_hash and new.version_number > 0) then
          raise exception 'current hash of form results for application % version % does not match the hash in the certification_url table', new.application_id, new.version_number;
        elsif ((select certification_signature from ggircs_portal.application_revision_certification_url(app_revision)) is null and new.version_number > 0) then
          raise exception 'application % version % has not been signed by a certifier', new.application_id, new.version_number;
        end if;
      end if;

    -- Creating a row in certification_url
    elsif (tg_op = 'INSERT' and tg_argv[0] is null) then
      new.form_results_md5 = form_result_hash;

    -- Updating the certification_signature in certification_url
    elsif (tg_op = 'UPDATE' and tg_argv[0] is null) then
      if (new.form_results_md5 != form_result_hash) then
        raise notice 'CURRENT HASH: %, CERTIFICATION_URL HASH: %', form_result_hash, new.form_results_md5;
        raise exception 'current hash of form results for application % version % does not match the hash in the certification_url table', new.application_id, new.version_number;
      end if;
      new.certified_at = now();
      new.certified_by = ciip_user_id;
    end if;

    return new;
  end;
  $$ language plpgsql volatile security definer;

commit;
