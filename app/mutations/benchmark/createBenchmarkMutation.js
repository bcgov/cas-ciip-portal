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
  const m = new BaseMutation('create-benchmark-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default createBenchmarkMutation;
