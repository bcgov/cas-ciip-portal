import {graphql} from 'react-relay';
import {
  updateFormResultMutation as updateFormResultMutationType,
  updateFormResultMutationVariables
} from 'updateFormResultMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';

const mutation = graphql`
  mutation updateFormResultMutation($input: UpdateFormResultInput!) {
    updateFormResult(input: $input) {
      formResult {
        id
        formResult
      }
    }
  }
`;

const updateFormResultMutation = async (
  environment: RelayModernEnvironment,
  variables: updateFormResultMutationVariables
) => {
  const optimisticResponse = {
    updateFormResult: {
      formResult: {
        id: variables.input.id,
        formResult: variables.input.formResultPatch.formResult
      }
    }
  };

  const m = new BaseMutation<updateFormResultMutationType>(
    'update-form-result-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse,
    null,
    `update-form-result${variables.input.id}`
  );
};

export default updateFormResultMutation;
