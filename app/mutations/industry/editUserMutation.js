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
  const m = new BaseMutation(
    environment,
    mutation,
    variables,
    'edit-user-mutation'
  );
  return m.performMutation();
};

export default editUserMutation;
