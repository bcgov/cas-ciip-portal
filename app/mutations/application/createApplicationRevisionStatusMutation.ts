import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createApplicationRevisionStatusMutationVariables,
  createApplicationRevisionStatusMutation as createApplicationRevisionStatusMutationType
} from 'createApplicationRevisionStatusMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createApplicationRevisionStatusMutation(
    $input: CreateApplicationRevisionStatusInput!
  ) {
    createApplicationRevisionStatus(input: $input) {
      clientMutationId
      applicationRevisionStatus {
        id
        versionNumber
        applicationRevisionByApplicationIdAndVersionNumber {
          applicationByApplicationId {
            id
            applicationRevisionStatus {
              id
              applicationRevisionStatus
            }
          }
        }
      }
    }
  }
`;

const createApplicationRevisionStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: createApplicationRevisionStatusMutationVariables
) => {
  const m = new BaseMutation<createApplicationRevisionStatusMutationType>(
    'create-application-status-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createApplicationRevisionStatusMutation;
