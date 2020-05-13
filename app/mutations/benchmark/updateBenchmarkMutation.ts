import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateBenchmarkMutation as updateBenchmarkMutationType,
  updateBenchmarkMutationVariables
} from 'updateBenchmarkMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateBenchmarkMutation($input: UpdateBenchmarkInput!) {
    updateBenchmark(input: $input) {
      benchmark {
        id
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const updateBenchmarkMutation = async (
  environment: RelayModernEnvironment,
  variables: updateBenchmarkMutationVariables
) => {
  // Optimistic response
  const updateBenchmarkPayload = {
    updateBenchmark: {
      benchmark: {
        id: variables.input.id,
        ...variables.input.benchmarkPatch
      }
    }
  };

  const m = new BaseMutation<updateBenchmarkMutationType>(
    'update-benchmark-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateBenchmarkPayload
  );
};

export default updateBenchmarkMutation;
