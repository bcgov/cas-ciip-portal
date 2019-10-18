import {commitMutation as commitMutationDefault, graphql} from 'react-relay';

const mutation = graphql`
  mutation createBenchmarkMutation($input: CreateBenchmarkMutationChainInput!) {
    createBenchmarkMutationChain(input: $input) {
      benchmark {
        id
      }
    }
  }
`;

let i = 0;
export const createBenchmarkMutation = async (environment, variables) => {
  variables.input.clientMutationId = `create-benchmark-mutation-${i}`;
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
