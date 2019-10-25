import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createApplicationMutation(
    $input: CreateApplicationMutationChainInput!
  ) {
    createApplicationMutationChain(input: $input) {
      clientMutationId
      application {
        id
      }
    }
  }
`;

const createApplicationMutation = async (environment, variables) => {
  const m = new BaseMutation('create-application-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default createApplicationMutation;
