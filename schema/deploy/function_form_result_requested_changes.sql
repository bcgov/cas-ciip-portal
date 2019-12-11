-- Deploy ggircs-portal:function_requested_changes to pg


begin;

create or replace function ggircs_portal.form_result_requested_changes
(_form_result ggircs_portal.form_result)
    returns setof ggircs_portal.application_review
as
$function$
begin
    return query (
        select _application_review.*
        from ggircs_portal.application_review as _application_review
        where _application_review.form_result_id = _form_result.id
        and _application_review.review_status = 'requested changes'
    );
end;
$function$
    language 'plpgsql' stable;


commit;
