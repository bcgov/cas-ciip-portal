-- Deploy ggircs-portal:function_requested_changes to pg
/*
begin;

  create or replace function ggircs_portal.form_result_requested_changes(form_result ggircs_portal.form_result)
    returns setof ggircs_portal.review_comment as
    $func$
      begin
      return query (
      /* select rc.* from ggircs_portal.application_review as ar
        inner join ggircs_portal.review_comment as rc
        on rc.application_review_id = ar.id
        and ar.review_status = 'requested changes'
        and ar.form_result_id = form_result.id
        */

      );
      end;
    $func$
     language 'plpgsql' stable;


commit;
*/

begin;

create or replace function ggircs_portal.form_result_requested_changes
(form_result ggircs_portal.form_result)
    returns ggircs_portal.application_review
as
$function$
begin
    return (
        select row(_application_review.*)
        from ggircs_portal.application_review as _application_review
        where _application_review.form_result_id = form_result.id
        and _application_review.review_status = 'requested changes'
        order by _application_review.created_at desc
        limit 1
    );
end;
$function$
    language 'plpgsql' stable;
commit;
