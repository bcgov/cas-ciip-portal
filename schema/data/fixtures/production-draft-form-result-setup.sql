-- create naics_code relationship with tested products 8: non-ciip, 9: Aluminum Smelting
-- ensure naics_code is present in form data
-- ensure production form result is empty on init

begin;

insert into ggircs_portal.naics_code(naics_code, naics_description) values ('1234', 'naicscode');
insert into ggircs_portal.product_naics_code(naics_code_id, product_id) values (1, 8), (1, 9);
update ggircs_portal.form_result set form_result = '{"operator": {"naics": "1234"}}' where form_id=(select id from ggircs_portal.form_json where slug = 'admin-2020');
update ggircs_portal.form_result set form_result = '[{}]' where id=4;

commit;
