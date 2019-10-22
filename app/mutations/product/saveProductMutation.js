import {graphql} from 'react-relay';
import BaseMutation from '../BaseMutation';

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
// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const saveProductMutation = async (environment, variables) => {
  const m = new BaseMutation(
    environment,
    mutation,
    variables,
    'save-product-mutation'
  );
  return m.performMutation();
};

export default saveProductMutation;
