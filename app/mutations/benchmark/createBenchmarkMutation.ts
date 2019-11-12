import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createBenchmarkMutation as createBenchmarkMutationType,
  createBenchmarkMutationVariables
} from '../../__generated__/createBenchmarkMutation.graphql';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createBenchmarkMutation($input: CreateBenchmarkMutationChainInput!) {
    createBenchmarkMutationChain(input: $input) {
      clientMutationId
      benchmark {
        id
        rowId
        benchmark
        eligibilityThreshold
        startDate
        endDate
      }
    }
  }
`;

const createBenchmarkMutation = async (
  environment: RelayModernEnvironment,
  variables: createBenchmarkMutationVariables
) => {
  const m = new BaseMutation<createBenchmarkMutationType>(
    'create-benchmark-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default createBenchmarkMutation;
