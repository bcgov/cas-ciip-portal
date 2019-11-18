import {graphql} from 'react-relay';
import {
  createUserMutation as createUserMutationType,
  createUserMutationVariables
} from '__generated__/createUserMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
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

const createUserMutation = async (
  environment: RelayModernEnvironment,
  variables: createUserMutationVariables
) => {
  return new BaseMutation<createUserMutationType>(
    'create-ciip-user-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createUserMutation;
