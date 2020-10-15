-- disable unnecessary triggers
-- create connection to application via ciip_user_organisation
-- ensure each production form is blank before each test

begin;

update ggircs_portal.form_result set form_result = '[{}]' where id=4;

commit;
