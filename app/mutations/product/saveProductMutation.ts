import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  saveProductMutation as saveProductMutationType,
  saveProductMutationVariables
} from 'saveProductMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

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
