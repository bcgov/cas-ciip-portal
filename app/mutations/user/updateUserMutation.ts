import {graphql} from 'react-relay';
import {
  updateUserMutation as updateUserMutationType,
  updateUserMutationVariables
} from '__generated__/updateUserMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

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
      clientMutationId
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
    true
  );
};

export default updateUserMutation;
