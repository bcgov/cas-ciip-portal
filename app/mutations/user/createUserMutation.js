import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        firstName
        lastName
        emailAddress
      }
    }
  }
`;

const createUserMutation = (environment, user) => {
  const variables = {
    input: {user}
  };

  return new BaseMutation('create-user-mutation').performMutation(
    environment,
    mutation,
    variables
  );
};

export default createUserMutation;
