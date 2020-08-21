import React, {useState} from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import {UserForm_user} from 'UserForm_user.graphql';
import createUserMutation from 'mutations/user/createUserMutation';
import updateUserMutation from 'mutations/user/updateUserMutation';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  user?: UserForm_user;
  relay: RelayProp;
  uuid?: string;
  defaultGivenName?: string;
  defaultFamilyName?: string;
  defaultEmail?: string;
  onSubmit: () => any;
}

const UserForm: React.FunctionComponent<Props> = ({
  user,
  uuid,
  defaultGivenName,
  defaultFamilyName,
  defaultEmail,
  relay,
  onSubmit
}) => {
  const handleChange = async (e: IChangeEvent<UserForm_user>) => {
    if (user) {
      const {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        occupation
      } = e.formData;
      await updateUserMutation(relay.environment, {
        input: {
          id: user.id,
          ciipUserPatch: {
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            occupation
          }
        }
      });
    }
  };

  const handleSubmit = async (e: IChangeEvent<UserForm_user>) => {
    if (user) await handleChange(e);
    else
      await createUserMutation(relay.environment, {
        input: {
          ciipUser: {
            ...e.formData,
            uuid
          }
        }
      });
    onSubmit();
  };

  const [userSchema] = useState<JSONSchema6>({
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First Name',
        default: defaultGivenName
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        default: defaultFamilyName
      },
      emailAddress: {
        type: 'string',
        title: 'Email Address',
        default: defaultEmail
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
  });

  return (
    <JsonSchemaForm
      omitExtraData
      liveOmit
      safeRenderCompletion
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
    fragment UserForm_user on CiipUser {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
