import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import createUserMutation from '../../mutations/user/createUserMutation';
import updateUserMutation from '../../mutations/user/updateUserMutation';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

const userSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name'
    },
    lastName: {
      type: 'string',
      title: 'Last Name'
    },
    emailAddress: {
      type: 'string',
      title: 'Email Address'
    },
    phoneNumber: {
      type: 'string',
      title: 'Phone Number'
    },
    occupation: {
      type: 'string',
      title: 'Occupation'
    }
  },
  required: [
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
    'occupation'
  ]
};

const UserForm = ({user, relay, sessionSub}) => {
  const handleChange = (e: IChangeEvent) => {
    if (user) updateUserMutation(relay.environment, user, e.formData);
  };

  const handleSubmit = (e: IChangeEvent) => {
    if (user) handleChange(e);
    else
      createUserMutation(relay.environment, {
        ...e.formData,
        uuid: sessionSub
      });
  };

  return (
    <JsonSchemaForm
      schema={userSchema}
      formData={user}
      showErrorList={false}
      ArrayFieldTemplate={FormArrayFieldTemplate}
      FieldTemplate={FormFieldTemplate}
      ObjectFieldTemplate={FormObjectFieldTemplate}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export {UserForm as UserFormComponent};
export default createFragmentContainer(UserForm, {
  user: graphql`
    fragment UserForm_user on User {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
