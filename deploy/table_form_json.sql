-- Deploy ggircs-portal:table_form_json to pg
-- requires: schema_ggircs_portal

BEGIN;

create table ggircs_portal.form_json (
  id serial not null,
  name varchar(1000) not null,
  form_json jsonb not null
  --todo: add versioning columns
);

create unique index form_json_id_uindex
	on ggircs_portal.form_json (id);

alter table ggircs_portal.form_json
	add constraint form_json_pk
		primary key (id);

comment on column ggircs_portal.form_json.id is 'Unique ID for the form';
comment on column ggircs_portal.form_json.name is 'Name for the form';
comment on column ggircs_portal.form_json.form_json is 'The JSON object that creates the form';

insert into ggircs_portal.form_json
  (
    id,
    name,
    form_json
  )
  values (
    1,
    'Test form 1',
    '{
        "elements": [
            { "type": "text", "name": "customerName", "title": "1: What is your name?", "isRequired": true}
        ]
      }'::jsonb
  ),(
    3,
    'Test form 2',
    '{
     "pages": [
      {
       "name": "CIIP IT UP!",
       "elements": [
        {
         "type": "text",
         "name": "company_name",
         "title": "Company Name"
        },
        {
         "type": "radiogroup",
         "name": "blow_up_swim",
         "title": "Blow Up SWIM?",
         "choices": [
          {
           "value": "item1",
           "text": "Yes"
          },
          {
           "value": "item2",
           "text": "Positive"
          },
          {
           "value": "item3",
           "text": "Whatever Andrea Says"
          }
         ]
        },
        {
         "type": "rating",
         "name": "hamza_is_this_awesome",
         "visibleIf": "{blow_up_swim} = \"item3\"",
         "title": "How awesome is Hamza?",
         "rateMin": 4,
         "rateStep": 0.25
        },
        {
         "type": "file",
         "name": "verification_statement",
         "title": "Upload a verification statement",
         "maxSize": 0
        }
       ]
      }
     ]
    }'::jsonb
);

COMMIT;
