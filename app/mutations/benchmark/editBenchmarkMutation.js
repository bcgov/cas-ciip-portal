import {commitMutation as commitMutationDefault, graphql} from 'react-relay';

const mutation = graphql`
  mutation editBenchmarkMutation($input: UpdateBenchmarkByRowIdInput!) {
    updateBenchmarkByRowId(input: $input) {
      benchmark {
        rowId
      }
    }
  }
`;

// TODO: abstract clientMutationId into a base class
// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
let i = 0;
export const editBenchmarkMutation = async (environment, variables) => {
  variables.input.clientMutationId = `edit-benchmark-mutation-${i}`;
  i++;

  function commitMutation(environment, options) {
    return new Promise((resolve, reject) => {
      commitMutationDefault(environment, {
        ...options,
        onError: error => {
          reject(error);
          console.log(error);
        },
        onCompleted: (response, errors) => {
          errors ? reject(errors) : resolve(response);
        }
      });
    });
  }

  // TODO: abstract onError into a base class
  return commitMutation(environment, {mutation, variables});
};
