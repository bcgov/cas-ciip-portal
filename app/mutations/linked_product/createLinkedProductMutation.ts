import {graphql} from 'react-relay';
import {
  createLinkedProductMutation as createLinkedProductMutationType,
  createLinkedProductMutationVariables
} from 'createLinkedProductMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createLinkedProductMutation($input: CreateLinkedProductInput!) {
    createLinkedProduct(input: $input) {
      linkedProduct {
        id
        rowId
        productId
        linkedProductId
      }
      query {
        allLinkedProducts {
          totalCount
        }
      }
    }
  }
`;

const createProductMutation = async (
  environment: RelayModernEnvironment,
  variables: createLinkedProductMutationVariables
) => {
  return new BaseMutation<createLinkedProductMutationType>(
    'create-product-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createProductMutation;
