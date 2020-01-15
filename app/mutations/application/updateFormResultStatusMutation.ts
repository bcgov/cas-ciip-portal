import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateFormResultStatusMutationVariables,
  updateFormResultStatusMutation as updateFormResultStatusMutationType
} from 'updateFormResultStatusMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateFormResultStatusMutation(
    $input: UpdateFormResultStatusInput!
  ) {
    updateFormResultStatus(input: $input) {
      clientMutationId
      formResultStatus {
        ...ApplicationReviewContainer_formResultStatus
      }
    }
  }
`;

const updateFormResultStatusMutation = async (
  environment: RelayModernEnvironment,
  variables: updateFormResultStatusMutationVariables
) => {
  const optimisticResponse = {
    updateFormResultStatus: {
      formResultStatus: {
        id: variables.input.id,
        ...variables.input.formResultStatusPatch
      }
    }
  };
  const m = new BaseMutation<updateFormResultStatusMutationType>(
    'update-form-result-status-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateFormResultStatusMutation;
