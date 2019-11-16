import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createUserMutation($input: CreateCiipUserInput!) {
    createCiipUser(input: $input) {
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

const createUserMutation = async (environment, user) => {
  const variables = {
    input: {user}
  };

  return new BaseMutation('create-ciip-user-mutation').performMutation(
    environment,
    mutation,
    variables
  );
};

export default createUserMutation;
