import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation saveProductMutation($input: SaveProductMutationChainInput!) {
    saveProductMutationChain(input: $input) {
      clientMutationId
      product {
        id
      }
    }
  }
`;

// TODO: abstract clientMutationId into a base class
let i = 0;
export const saveProductMutation = (environment, newVariables, benchmarkId) => {
  const variables = {
    input: {
      clientMutationId: `save-product-mutation-${i}`,
      prevId: newVariables.prevId,
      newName: newVariables.newName,
      newDescription: newVariables.newDescription,
      newState: newVariables.newState,
      newParent: [newVariables.prevId],
      benchmarkId
    }
  };
  i++;

  // Currently not returning anything
  // TODO: wrap onCompleted into a promise
  // TODO: abstract onError into a base class
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: async response => {
      console.log(response);
    },
    onError: err => console.error(err)
  });
};
