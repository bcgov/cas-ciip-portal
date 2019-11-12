import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from '../BaseMutation';
import {
  editBenchmarkMutation as editBenchmarkMutationType,
  editBenchmarkMutationVariables
} from '../../__generated__/editBenchmarkMutation.graphql';

const mutation = graphql`
  mutation editBenchmarkMutation($input: UpdateBenchmarkInput!) {
    updateBenchmark(input: $input) {
      benchmark {
        id
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const editBenchmarkMutation = async (
  environment: RelayModernEnvironment,
  variables: editBenchmarkMutationVariables
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

  const m = new BaseMutation<editBenchmarkMutationType>(
    'edit-benchmark-mutation'
  );
  return m.performMutation(
    environment,
    mutation,
    variables,
    updateBenchmarkPayload
  );
};

export default editBenchmarkMutation;
