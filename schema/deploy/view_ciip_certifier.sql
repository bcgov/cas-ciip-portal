-- Deploy ggircs-portal:view_ciip_certifier to pg
-- requires: table_form_result

begin;

  create view ggircs_portal.ciip_certifier as (
    with x as (
      select
        form_result.application_id as id,
        json_array_elements((form_result -> 'certifiyingOfficial')::json) as certifier_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Statement of Certification'
    )
    select
       x.id,
       (x.certifier_data ->> 'fax')::varchar(1000) as fax,
       (x.certifier_data ->> 'phone')::varchar(1000) as phone,
       (x.certifier_data ->> 'position')::varchar(1000) as position,
       (x.certifier_data ->> 'lastName')::varchar(1000) as last_name,
       (x.certifier_data ->> 'firstName')::varchar(1000) as first_name,
       (x.certifier_data ->> 'emailAddress')::varchar(1000) as email_address,
       (x.certifier_data ->> 'certifierName')::varchar(1000) as certifier_name,
       (x.certifier_data ->> 'date')::date as certification_date
       -- add certifier address to address view
    from x
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_certifier is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_certifier is 'The view for certifier data reported in the application';
-- comment on column ggircs_portal.ciip_certifier.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_certifier.fax is 'The certifier fax';
-- comment on column ggircs_portal.ciip_certifier.phone is 'The certifier phone';
-- comment on column ggircs_portal.ciip_certifier.position is 'The certifier position';
-- comment on column ggircs_portal.ciip_certifier.last_name is 'The last name of the certifier';
-- comment on column ggircs_portal.ciip_certifier.first_name is 'The first name of the certifier';
-- comment on column ggircs_portal.ciip_certifier.email_address is 'The email address of the certifier';

commit;
