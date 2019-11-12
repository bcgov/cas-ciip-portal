import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from '../BaseMutation';
import {
  saveProductMutation as saveProductMutationType,
  saveProductMutationVariables
} from '../../__generated__/saveProductMutation.graphql';

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

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const saveProductMutation = async (
  environment: RelayModernEnvironment,
  variables: saveProductMutationVariables
) => {
  const m = new BaseMutation<saveProductMutationType>('save-product-mutation');
  return m.performMutation(environment, mutation, variables);
};

export default saveProductMutation;
