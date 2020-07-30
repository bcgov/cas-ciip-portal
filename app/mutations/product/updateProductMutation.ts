import {graphql} from 'react-relay';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateProductMutation as updateProductMutationType,
  updateProductMutationVariables
} from 'updateProductMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateProductMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      product {
        id
        productName
        productState
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const updateProductMutation = async (
  environment: RelayModernEnvironment,
  variables: updateProductMutationVariables
) => {
  const m = new BaseMutation<updateProductMutationType>(
    'update-product-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default updateProductMutation;
