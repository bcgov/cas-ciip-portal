import {graphql, DeclarativeMutationConfig} from 'react-relay';
import {
  createProductMutation as createProductMutationType,
  createProductMutationVariables
} from 'createProductMutation.graphql';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      productEdge {
        node {
          id
          productName
          units
          requiresEmissionAllocation
          productState
          isCiipProduct
          isEnergyProduct
          addPurchasedElectricityEmissions
          subtractExportedElectricityEmissions
          addPurchasedHeatEmissions
          subtractExportedHeatEmissions
          subtractGeneratedElectricityEmissions
          subtractGeneratedHeatEmissions
          requiresProductAmount
        }
      }
    }
  }
`;

const createProductMutation = async (
  environment: RelayModernEnvironment,
  variables: createProductMutationVariables
) => {
  const connectionKey = 'ProductListContainer_allProducts';
  const configs: DeclarativeMutationConfig[] = [
    {
      type: 'RANGE_ADD',
      parentID: 'query',
      connectionInfo: [
        {
          key: connectionKey,
          rangeBehavior: 'append'
        }
      ],
      edgeName: 'productEdge'
    }
  ];
  return new BaseMutation<createProductMutationType>(
    'create-product-mutation',
    configs
  ).performMutation(environment, mutation, variables);
};

export default createProductMutation;
