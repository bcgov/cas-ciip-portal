import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  createBenchmarkMutation as createBenchmarkMutationType,
  createBenchmarkMutationVariables
} from 'createBenchmarkMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createBenchmarkMutation(
    $input: CreateBenchmarkInput!
    $productId: ID!
  ) {
    createBenchmark(input: $input) {
      benchmark {
        id
        rowId
        productId
        benchmark
        eligibilityThreshold
        incentiveMultiplier
        startReportingYear
        endReportingYear
        minimumIncentiveRatio
        maximumIncentiveRatio
        createdAt
      }
      query {
        product(id: $productId) {
          ...ProductRowItemContainer_product
        }
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
