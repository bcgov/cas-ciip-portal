import {graphql} from 'react-relay';
import {
  updateUserMutation as updateUserMutationType,
  updateUserMutationVariables
} from 'updateUserMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';

const mutationQuery = graphql`
  mutation updateUserMutation($input: UpdateCiipUserInput!) {
    updateCiipUser(input: $input) {
      ciipUser {
        id
        firstName
        lastName
        emailAddress
        occupation
        phoneNumber
      }
    }
  }
`;

const mutation = new BaseMutation<updateUserMutationType>(
  'update-ciip-user-mutation'
);

const updateUserMutation = async (
  environment: RelayModernEnvironment,
  variables: updateUserMutationVariables
) => {
  // Optimistic response
  const updateUserPayload = {
    updateCiipUser: {
      ciipUser: {
        id: variables.input.id,
        ...variables.input.ciipUserPatch
      }
    }
  };

  return mutation.performMutation(
    environment,
    mutationQuery,
    variables,
    updateUserPayload,
    null,
    `update-ciip-user${variables.input.id}`
  );
};

export default updateUserMutation;
