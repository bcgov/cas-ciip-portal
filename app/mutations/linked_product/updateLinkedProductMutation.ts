import {graphql} from 'react-relay';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {
  updateLinkedProductMutation as updateLinkedProductMutationType,
  updateLinkedProductMutationVariables
} from 'updateLinkedProductMutation.graphql';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateLinkedProductMutation(
    $input: UpdateLinkedProductByRowIdInput!
  ) {
    updateLinkedProductByRowId(input: $input) {
      linkedProduct {
        id
        productId
        linkedProductId
        isDeleted
      }
    }
  }
`;

// TODO: May want to surface the onCompleted errors to the user (ie not reject, resolve & report)
const updateLinkedProductMutation = async (
  environment: RelayModernEnvironment,
  variables: updateLinkedProductMutationVariables
) => {
  const m = new BaseMutation<updateLinkedProductMutationType>(
    'update-product-mutation'
  );
  return m.performMutation(environment, mutation, variables);
};

export default updateLinkedProductMutation;
