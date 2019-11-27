-- Deploy ggircs-portal:function_form_result_form_result_review to pg
-- requires: table_form_result_review
-- requires: table_form_result

begin;

create or replace function ggircs_portal.form_result_application_review(form_result ggircs_portal.form_result)
    returns ggircs_portal.application_review
as
$function$
declare
begin
    return (
        select row(_application_review.*)
        from ggircs_portal.application_review as _application_review
        where _application_review.form_result_id = form_result.id
        order by _application_review.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;
commit;
