import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation createBenchmarkMutation($input: CreateBenchmarkMutationChainInput!) {
    createBenchmarkMutationChain(input: $input) {
      benchmark {
        id
      }
    }
  }
`;

export const createBenchmarkMutation = (environment, newVariables) => {
  commitMutation(environment, {
    mutation,
    variables: newVariables,
    onCompleted: async response => {
      console.log(response);
    },
    onError: err => console.error(err)
  });
};
