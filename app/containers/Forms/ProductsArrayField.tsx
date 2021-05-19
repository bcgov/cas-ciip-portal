import React, {useEffect} from 'react';
import {FieldProps} from '@rjsf/core';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ProductsArrayField_naicsProducts} from 'ProductsArrayField_naicsProducts.graphql';
import updateFormResultMutation from 'mutations/form/updateFormResultMutation';

interface Props extends FieldProps {
  naicsProducts: ProductsArrayField_naicsProducts;
  relay: RelayProp;
}

export const ProductsArrayFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {naicsProducts, formContext, registry} = props;
  const {ArrayField} = registry.fields;

  useEffect(() => {
    const initializeFormResult = async (variables) => {
      await updateFormResultMutation(props.relay.environment, variables);
    };
    const productionFormResult = formContext.ciipFormResult.formResult.map(
      (product) => ({
        ...product,
        isMandatory: naicsProducts?.mandatoryProducts?.edges.some(
          ({node}) => node.productByProductId.rowId === product.productRowId
        )
      })
    );

    const productsToInitialize =
      naicsProducts?.mandatoryProducts?.edges.filter(
        (edge) =>
          !productionFormResult.some(
            (res) => res.productRowId === edge.node.productByProductId.rowId
          )
      ) || [];
    const initializedFormResult = productionFormResult.concat(
      ...productsToInitialize.map((edge) => {
        return {
          ...edge.node.productByProductId,
          productUnits: edge.node.productByProductId.units,
          productRowId: edge.node.productByProductId.rowId,
          isMandatory: true
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
    initializeFormResult(variables);
  }, [naicsProducts]);

  return <ArrayField {...props} />;
};

export default createFragmentContainer(ProductsArrayFieldComponent, {
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
