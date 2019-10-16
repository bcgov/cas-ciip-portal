import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation saveProductMutation($input: SaveProductMutationChainInput!) {
    saveProductMutationChain(input: $input) {
      product {
        id
      }
    }
  }
`;

export const saveProductMutation = (environment, newVariables, benchmarkId) => {
  const saveVariables = {
    input: {
      prevId: newVariables.prevId,
      newName: newVariables.newName,
      newDescription: newVariables.newDescription,
      newState: newVariables.newState,
      newParent: [newVariables.prevId],
      benchmarkId
    }
  };

  const saveMutation = mutation;
  // Get the current Benchmark -- calculated by which benchmark is not archived and current date within the start & end dates
  commitMutation(environment, {
    mutation: saveMutation,
    variables: saveVariables,
    onCompleted: async response => {
      console.log(response);
    },
    onError: err => console.error(err)
  });
};
