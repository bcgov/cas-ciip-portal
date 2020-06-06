import {graphql} from 'react-relay';
import {
  createProductLinkMutation as createProductLinkMutationType,
  createProductLinkMutationVariables
} from 'createProductMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createProductLinkMutation($input: CreateProductLinkInput!) {
    createProductLink(input: $input) {
      productLink {
        id
        rowId
        productId
        linkedProductId
      }
      query {
        allProductLinks {
          totalCount
        }
      }
    }
  }
`;

const createProductMutation = async (
  environment: RelayModernEnvironment,
  variables: createProductLinkMutationVariables
) => {
  return new BaseMutation<createProductLinkMutationType>(
    'create-product-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createProductMutation;
