import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateProductLinkMutation as updateProductLinkMutationType,
  updateProductLinkMutationVariables
} from 'updateProductLinkMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateProductLinkMutation($input: UpdateProductLinkInput!) {
    updateProductLink(input: $input) {
      productLink {
        id
        productId
        linkedProductId
        isDeleted
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const updateProductLinkMutation = async (
  environment: RelayModernEnvironment,
  variables: updateProductLinkMutationVariables
) => {
  const m = new BaseMutation<updateProductLinkMutationType>(
    'update-product-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default updateProductLinkMutation;
