-- Revert ggircs-portal:tables/certification_url_001 from pg

BEGIN;


create trigger _create_form_result_md5
  before insert on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.signature_md5();

create trigger _check_form_result_md5
  before update of certification_signature on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.signature_md5();

create trigger _certification_request_email
  before update of certifier_email on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('certification_request');

create trigger _signed_by_certifier_email
  before update of certification_signature on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('signed_by_certifier');

create trigger _recertification_request
  before update of recertification_request_sent on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('recertification');

COMMIT;
