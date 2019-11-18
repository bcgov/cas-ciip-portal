import {graphql} from 'react-relay';
import {updateUserMutation as updateUserMutationType} from '__generated__/updateUserMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
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

const updateUserMutation = async (environment, user, ciipUserPatch) => {
  // Optimistic response
  const updateUserPayload = {
    updateCiipUser: {
      ciipUser: {
        ...user,
        ...ciipUserPatch
      }
    }
  };

  const variables = {
    input: {
      id: user.id,
      ciipUserPatch
    }
  };

  return new BaseMutation<updateUserMutationType>(
    'update-ciip-user-mutation'
  ).performMutation(environment, mutation, variables, updateUserPayload);
};

export default updateUserMutation;
