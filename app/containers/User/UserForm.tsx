import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import {UserForm_user} from 'UserForm_user.graphql';
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

interface Props {
  user?: UserForm_user;
  relay: RelayProp;
  sessionSub?: string;
  onSubmit: () => any;
}

const UserForm = ({user, relay, sessionSub, onSubmit}) => {
  const handleChange = async (e: IChangeEvent) => {
    if (user) await updateUserMutation(relay.environment, user, e.formData);
  };

  const handleSubmit = async (e: IChangeEvent) => {
    if (user) await handleChange(e);
    else
      await createUserMutation(relay.environment, {
        ...e.formData,
        uuid: sessionSub
      });
    onSubmit();
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
