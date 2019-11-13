import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  editUserMutation as editUserMutationType,
  editUserMutationVariables
} from 'editUserMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation editUserMutation($input: UpdateUserByRowIdInput!) {
    updateUserByRowId(input: $input) {
      user {
        rowId
      }
      clientMutationId
    }
  }
`;

const editUserMutation = async (
  environment: RelayModernEnvironment,
  variables: editUserMutationVariables
) => {
  // Optimistic response
  const updateUserPayload = {
    updateUserByRowId: {
      user: {
        rowId: variables.input.rowId,
        ...variables.input.userPatch
      }
    }
  };

  const m = new BaseMutation<editUserMutationType>('edit-user-mutation');
  return m.performMutation(environment, mutation, variables, updateUserPayload);
};

export default editUserMutation;
