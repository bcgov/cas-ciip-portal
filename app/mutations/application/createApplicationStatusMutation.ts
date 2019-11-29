import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createApplicationStatusMutationVariables,
  createApplicationStatusMutation as createApplicationStatusMutationType
} from 'createApplicationStatusMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createApplicationStatusMutation(
    $input: CreateApplicationStatusInput!
  ) {
    createApplicationStatus(input: $input) {
      clientMutationId
      applicationStatus {
        id
      }
    }
  }
`;

const createApplicationStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: createApplicationStatusMutationVariables
) => {
  const m = new BaseMutation<createApplicationStatusMutationType>(
    'create-application-status-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createApplicationStatusMutation;
