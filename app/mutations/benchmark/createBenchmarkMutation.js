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

export const createBenchmarkMutation = (environment, variables) => {
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: async response => {
      console.log(response);
    },
    onError: err => console.error(err)
  });
};
