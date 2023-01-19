import { graphql } from "react-relay";
import {
  createOrUpdateUserMutation as createOrUpdateUserMutationType,
  createOrUpdateUserMutationVariables,
} from "__generated__/createOrUpdateUserMutation.graphql";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import BaseMutation from "mutations/BaseMutation";

const mutation = graphql`
  mutation createOrUpdateUserMutation($input: CreateOrUpdateCiipUserInput!) {
    createOrUpdateCiipUser(input: $input) {
      ciipUser {
        firstName
        lastName
        emailAddress
        occupation
        phoneNumber
      }
    }
  }
`;

const createOrUpdateUserMutation = async (
  environment: RelayModernEnvironment,
  variables: createOrUpdateUserMutationVariables
) => {
  return new BaseMutation<createOrUpdateUserMutationType>(
    "create-or-update-ciip-user-mutation"
  ).performMutation(environment, mutation, variables);
};

export default createOrUpdateUserMutation;
