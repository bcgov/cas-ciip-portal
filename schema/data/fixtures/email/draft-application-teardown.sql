begin;

select test_helper.modify_triggers('enable');

with app_id as (
  select id from ggircs_portal.application where facility_id=100
) delete from ggircs_portal.form_result_status where application_id=(select id from app_id);

with app_id as (
  select id from ggircs_portal.application where facility_id=100
) delete from ggircs_portal.form_result where application_id=(select id from app_id);

with app_id as (
  select id from ggircs_portal.application where facility_id=100
) delete from ggircs_portal.application_revision_status where application_id = (select id from app_id);

with app_id as (
  select id from ggircs_portal.application where facility_id=100
) delete from ggircs_portal.application_revision where application_id=(select id from app_id);

delete from ggircs_portal.application where facility_id = 100;
delete from ggircs_portal.facility where id = 100;
delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 200;
delete from ggircs_portal.organisation where id = 200;

commit;
