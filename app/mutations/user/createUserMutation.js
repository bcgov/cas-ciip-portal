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

const createUserMutation = (environment, variables) => {
  const createUserMutation = new BaseMutation(
    environment,
    mutation,
    variables,
    'create-user-mutation'
  );

  return createUserMutation.performMutation();
};

export default createUserMutation;
