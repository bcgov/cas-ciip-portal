import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createFormResultStatusMutationVariables,
  createFormResultStatusMutation as createFormResultStatusMutationType
} from 'createFormResultStatusMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createFormResultStatusMutation(
    $input: CreateFormResultStatusInput!
    $applicationId: ID!
    $version: String!
  ) {
    createFormResultStatus(input: $input) {
      clientMutationId
      formResultStatus {
        ...ApplicationReviewContainer_formResultStatus
      }
      query {
        application(id: $applicationId) {
          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  }
`;

const createFormResultStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: createFormResultStatusMutationVariables
) => {
  const m = new BaseMutation<createFormResultStatusMutationType>(
    'create-form-result-status-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createFormResultStatusMutation;
