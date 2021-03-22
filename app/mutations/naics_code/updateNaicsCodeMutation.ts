import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateNaicsCodeMutationVariables,
  updateNaicsCodeMutation as updateNaicsCodeMutationType
} from 'updateNaicsCodeMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateNaicsCodeMutation($input: UpdateNaicsCodeInput!) {
    updateNaicsCode(input: $input) {
      naicsCode {
        ...NaicsCodeTableRow_naicsCode
        deletedAt
      }
      query {
        ...NaicsCodeTable_query
      }
    }
  }
`;

const updateNaicsCodeMutation = async (
  environment: RelayModernEnvironment,
  variables: updateNaicsCodeMutationVariables
) => {
  const optimisticResponse = {
    updateNaicsCode: {
      naicsCode: {
        id: variables.input.id,
        ...variables.input.naicsCodePatch
      }
    }
  };
  const m = new BaseMutation<updateNaicsCodeMutationType>(
    'update-review-comment-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    optimisticResponse
  );
};

export default updateNaicsCodeMutation;
