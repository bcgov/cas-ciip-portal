import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation updateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        firstName
        lastName
        emailAddress
        id
      }
      clientMutationId
    }
  }
`;

const updateUserMutation = (environment, user, userPatch) => {
  // TODO: userPatch make sure to patch only right fields
  const UpdateUserInput = {
    id: user.id,
    userPatch
  };

  const updateUserPayload = {
    updateUser: {
      user: {
        ...user,
        ...userPatch
      }
    }
  };

  const variables = {
    input: UpdateUserInput
  };

  return new BaseMutation('update-user-mutation').performMutation(
    environment,
    mutation,
    variables,
    updateUserPayload
  );
};

export default updateUserMutation;
