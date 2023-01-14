import React, { useMemo, useState } from "react";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import JsonSchemaForm, { IChangeEvent, AjvError } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import { UserForm_user } from "UserForm_user.graphql";
import createOrUpdateUserMutation from "mutations/user/createOrUpdateUserMutation";
import updateUserMutation from "mutations/user/updateUserMutation";
import FormArrayFieldTemplate from "containers/Forms/FormArrayFieldTemplate";
import FormFieldTemplate from "containers/Forms/FormFieldTemplate";
import FormObjectFieldTemplate from "containers/Forms/FormObjectFieldTemplate";
import { customTransformErrors } from "functions/customTransformErrors";

interface Props {
  user?: UserForm_user;
  relay: RelayProp;
  defaultGivenName?: string;
  defaultFamilyName?: string;
  defaultEmail?: string;
  onSubmit: () => any;
}

const customFormats = {
  phoneNumber:
    "^(\\+?\\d{1,2}[\\s,-]?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
};

const customFormatsErrorMessages = {
  phoneNumber:
    "Please enter a valid phone number. eg: 1-234-567-8943, 123 456 7890, +12 345 678 9012",
  email: "Please enter a valid email address. eg: mail@example.com",
};

const transformErrors = (errors: AjvError[]) => {
  return customTransformErrors(errors, customFormatsErrorMessages);
};

const UserForm: React.FunctionComponent<Props> = ({
  user,
  defaultGivenName,
  defaultFamilyName,
  defaultEmail,
  relay,
  onSubmit,
}) => {
  const handleChange = async (e: IChangeEvent<UserForm_user>) => {
    if (user) {
      const { firstName, lastName, phoneNumber, occupation } = e.formData;
      await updateUserMutation(relay.environment, {
        input: {
          id: user.id,
          ciipUserPatch: {
            firstName,
            lastName,
            phoneNumber,
            occupation,
          },
        },
      });
    }
  };

  const handleSubmit = async (e: IChangeEvent<UserForm_user>) => {
    if (user) await handleChange(e);
    else {
      const { firstName, lastName, phoneNumber, occupation } = e.formData;
      await createOrUpdateUserMutation(relay.environment, {
        input: {
          firstName,
          lastName,
          phoneNumber,
          occupation,
        },
      });
    }
    onSubmit();
  };

  const userSchema: JSONSchema7 = useMemo(
    () => ({
      type: "object",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
          default: defaultGivenName,
        },
        lastName: {
          type: "string",
          title: "Last Name",
          default: defaultFamilyName,
        },
        emailAddress: {
          type: "string",
          title: "Email Address",
          default: defaultEmail,
          format: "email",
        },
        phoneNumber: {
          type: "string",
          title: "Phone Number",
          format: "phoneNumber",
        },
        occupation: {
          type: "string",
          title: "Occupation",
        },
      },
      required: ["firstName", "lastName", "phoneNumber", "occupation"],
    }),
    [defaultGivenName, defaultFamilyName, defaultEmail]
  );

  const uiSchema = {
    emailAddress: {
      "ui:disabled": true,
    },
  };

  return (
    <JsonSchemaForm
      omitExtraData
      liveOmit
      liveValidate
      schema={userSchema}
      uiSchema={uiSchema}
      customFormats={customFormats}
      transformErrors={transformErrors}
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

export { UserForm as UserFormComponent };
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
  `,
});
