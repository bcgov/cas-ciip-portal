import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
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

const updateUserMutation = async (environment, user, userPatch) => {
  // Optimistic response
  const updateUserPayload = {
    updateUser: {
      user: {
        ...user,
        ...userPatch
      }
    }
  };

  const variables = {
    input: {
      id: user.id,
      userPatch
    }
  };

  return new BaseMutation('update-user-mutation').performMutation(
    environment,
    mutation,
    variables,
    updateUserPayload
  );
};

export default updateUserMutation;
