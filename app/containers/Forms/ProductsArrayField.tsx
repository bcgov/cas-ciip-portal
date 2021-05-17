import React, {useEffect} from 'react';
import {FieldProps} from '@rjsf/core';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ProductsArrayField_naicsProducts} from 'ProductsArrayField_naicsProducts.graphql';
import updateFormResultMutation from 'mutations/form/updateFormResultMutation';

interface Props extends FieldProps {
  naicsProducts: ProductsArrayField_naicsProducts;
  relay: RelayProp;
}

const ProductsArrayField: React.FunctionComponent<Props> = (props) => {
  const {naicsProducts, formContext, registry} = props;
  const {ArrayField} = registry.fields;

  useEffect(() => {
    const initializeFormResult = async (variables) => {
      await updateFormResultMutation(props.relay.environment, variables);
    };
    const productionFormResult = formContext.ciipFormResult.formResult;
    const allMandatoryProductsInitialized = naicsProducts.mandatoryProducts.edges.every(
      (edge) => {
        return productionFormResult.some(
          (res) => res.rowId === edge.node.productByProductId.rowId
        );
      }
    );
    if (allMandatoryProductsInitialized) return;

    const productsToInitialize = naicsProducts.mandatoryProducts.edges.filter(
      (edge) =>
        !productionFormResult.some(
          (res) => res.productRowId === edge.node.productByProductId.rowId
        )
    );
    const initializedFormResult = productionFormResult.concat(
      ...productsToInitialize.map((edge) => {
        return {
          ...edge.node.productByProductId,
          productRowId: edge.node.productByProductId.rowId
        };
      })
    );
    const variables = {
      input: {
        id: formContext.ciipFormResult.id,
        formResultPatch: {
          formResult: initializedFormResult
        }
      }
    };
    if (productsToInitialize.length > 0) initializeFormResult(variables);
  }, [naicsProducts]);

  return <ArrayField {...props} />;
};

export default createFragmentContainer(ProductsArrayField, {
  // NOTE: It would be more ideal to have a reusable "product" fragment shared between here (productByProductId) and in ProductField_query to sync the queried properties needed by the ProductField
  naicsProducts: graphql`
    fragment ProductsArrayField_naicsProducts on NaicsCode {
      mandatoryProducts: productNaicsCodesByNaicsCodeId(
        condition: {isMandatory: true}
      ) {
        edges {
          node {
            id
            productByProductId {
              rowId
              units
              productState
              requiresEmissionAllocation
              requiresProductAmount
              isEnergyProduct
              addPurchasedElectricityEmissions
              addPurchasedHeatEmissions
              subtractExportedElectricityEmissions
              subtractExportedHeatEmissions
              subtractGeneratedElectricityEmissions
              subtractGeneratedHeatEmissions
              addEmissionsFromEios
            }
          }
        }
      }
    }
  `
});
