import {graphql} from 'react-relay';
import BaseMutation from '../mutationBaseClass';

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

export const createBenchmarkMutation = async (environment, variables) => {
  const m = new BaseMutation(
    environment,
    mutation,
    variables,
    'create-benchmark-mutation'
  );
  return m.performMutation();
};
