-- Deploy ggircs-portal:attachment_policies to pg

do
$policy$
declare industry_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_attachment', 'attachment', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_attachment', 'attachment', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_attachment', 'attachment', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_attachment', 'attachment', 'select', 'ciip_analyst', 'true');

industry_user_statement := '(select facility_id from ggircs_portal.application where application.id = attachment.application_id) in (select ggircs_portal_private.get_valid_application_facilities())';
-- industry_user_statement :=
--     select facility_id
--     from ggircs_portal.application
--     join ggircs_portal.attachment
--         on ggircs_portal.application.id = ggircs_portal.attachment.application_id
--     in (select ggircs_portal_private.get_valid_application_facilities());

    -- industry_user_statement := (select facility_id from (
    --     select facility_id
    --     from ggircs_portal.application
    --     where application.id in (select application_id from ggircs_portal.attachment)
    --     ) as facility_ids
    --     where facility_id
    --     in (select ggircs_portal_private.get_valid_application_facilities()));

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_attachment', 'attachment', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_attachment', 'attachment', 'insert', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_update_attachment', 'attachment', 'update', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_delete_attachment', 'attachment', 'delete', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;
