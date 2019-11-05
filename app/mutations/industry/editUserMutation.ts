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
  const m = new BaseMutation('edit-user-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default editUserMutation;
