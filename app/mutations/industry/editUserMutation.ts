import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation editUserMutation($input: UpdateUserByRowIdInput!) {
    updateUserByRowId(input: $input) {
      user {
        rowId
      }
    }
  }
`;

const editUserMutation = async (environment, variables) => {
  // Optimistic response
  const updateUserPayload = {
    updateUserByRowId: {
      user: {
        rowId: variables.input.rowId,
        ...variables.input.userPatch
      }
    }
  };

  const m = new BaseMutation('edit-user-mutation');
  return m.performMutation(environment, mutation, variables, updateUserPayload);
};

export default editUserMutation;
