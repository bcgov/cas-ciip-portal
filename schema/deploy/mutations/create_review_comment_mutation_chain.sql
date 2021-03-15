-- Deploy ggircs-portal:mutations/create_review_comment_mutation_chain to pg
-- requires: tables/review_comments

begin;

create or replace function ggircs_portal.create_review_comment_mutation_chain(
  application_id_input int,
  form_id_input int,
  description_input varchar(100000),
  comment_type_input ggircs_portal.review_comment_type
)
returns ggircs_portal.review_comment
as $function$
declare
  new_id int;
  result ggircs_portal.review_comment;
begin

  -- Insert new value into review_comment
  insert into ggircs_portal.review_comment(application_id, form_id, description, comment_type)
  values (application_id_input, form_id_input, description_input, comment_type_input)
  returning id into new_id;

  select * from ggircs_portal.review_comment where id = new_id into result;
  return result;
end;
$function$ language plpgsql volatile;

grant execute on function ggircs_portal.create_review_comment_mutation_chain to ciip_administrator, ciip_analyst;

commit;
