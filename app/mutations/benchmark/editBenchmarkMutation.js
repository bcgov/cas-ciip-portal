import {graphql} from 'react-relay';
import BaseMutation from '../mutationBaseClass';

const mutation = graphql`
  mutation editBenchmarkMutation($input: UpdateBenchmarkInput!) {
    updateBenchmark(input: $input) {
      benchmark {
        id
      }
    }
  }
`;

// TODO: abstract clientMutationId into a base class
// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
// TODO: Add optimistic updates https://relay.dev/docs/en/mutations https://relay.dev/docs/en/relay-store
export const editBenchmarkMutation = async (environment, variables) => {
  const m = new BaseMutation(
    environment,
    mutation,
    variables,
    'edit-benchmark-mutation'
  );
  return m.performMutation();
};
