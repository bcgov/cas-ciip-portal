import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  analystCreateApplicationRevisionStatusMutationVariables,
  analystCreateApplicationRevisionStatusMutation as analystCreateApplicationRevisionStatusMutationType
} from 'analystCreateApplicationRevisionStatusMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation analystCreateApplicationRevisionStatusMutation(
    $input: CreateApplicationRevisionStatusInput!
  ) {
    createApplicationRevisionStatus(input: $input) {
      applicationRevisionStatus {
        id
        versionNumber
        applicationRevisionByApplicationIdAndVersionNumber {
          id
          applicationRevisionStatus {
            id
            applicationRevisionStatus
          }
          applicationByApplicationId {
            id
            applicationReviewStepsByApplicationId {
              ...ApplicationReviewStepSelector_applicationReviewSteps
            }
          }
        }
      }
    }
  }
`;

const analystCreateApplicationRevisionStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: analystCreateApplicationRevisionStatusMutationVariables
) => {
  const m = new BaseMutation<
    analystCreateApplicationRevisionStatusMutationType
  >('analyst-create-application-status-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default analystCreateApplicationRevisionStatusMutation;
export {mutation};
