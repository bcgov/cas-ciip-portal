import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation editBenchmarkMutation($input: UpdateBenchmarkByRowIdInput!) {
    updateBenchmarkByRowId(input: $input) {
      benchmark {
        rowId
      }
    }
  }
`;

export const editBenchmarkMutation = (
  environment,
  benchmarkRowId,
  benchmarkPatch
) => {
  const variables = {
    input: {
      rowId: benchmarkRowId,
      benchmarkPatch
    }
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: response => {
      console.log(response);
    },
    onError: err => console.error(err)
  });
};
