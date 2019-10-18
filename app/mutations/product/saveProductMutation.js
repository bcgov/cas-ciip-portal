import {commitMutation as commitMutationDefault, graphql} from 'react-relay';

const mutation = graphql`
  mutation saveProductMutation($input: SaveProductMutationChainInput!) {
    saveProductMutationChain(input: $input) {
      clientMutationId
      product {
        id
        name
        description
        state
        parent
        benchmarksByProductId {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

// TODO: abstract clientMutationId into a base class
let i = 0;
export const saveProductMutation = async (environment, variables) => {
  variables.input.clientMutationId = `save-product-mutation-${i}`;
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
