import {graphql} from 'react-relay';
import {
  createProductMutation as createProductMutationType,
  createProductMutationVariables
} from 'createProductMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from '../BaseMutation';

const mutation = graphql`
  mutation createProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      product {
        rowId
      }
      query {
        ...ProductListContainer_query
      }
      clientMutationId
    }
  }
`;

const createProductMutation = async (
  environment: RelayModernEnvironment,
  variables: createProductMutationVariables
) => {
  return new BaseMutation<createProductMutationType>(
    'create-product-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createProductMutation;
