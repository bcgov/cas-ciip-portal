import {graphql} from 'react-relay';
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

const createBenchmarkMutation = async (environment, variables) => {
  // Optimistic response
  const createBenchmarkMutationChainPayload = {
    benchmark: {
      productId: variables.input.productIdInput,
      benchmark: variables.input.benchmarkInput,
      eligibilityThreshold: variables.input.eligibilityThresholdInput,
      startDate: variables.input.startDateInput,
      endDate: variables.input.prevBenchmarkIdInput
    }
  };

  const m = new BaseMutation('create-benchmark-mutation');
  return m.performMutation(
    environment,
    mutation,
    variables,
    createBenchmarkMutationChainPayload
  );
};

export default createBenchmarkMutation;
