import React from 'react';
import {Alert} from 'react-bootstrap';
import {FieldProps} from '@rjsf/core';
import ObjectField from '@rjsf/core/dist/cjs/components/fields/ObjectField';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductField_query} from 'ProductField_query.graphql';
import {ProductField_naicsCode} from 'ProductField_naicsCode.graphql';

interface FormData {
  productRowId?: number;
  productAmount?: number;
  productUnits?: string;
  productEmissions?: number;
  requiresEmissionAllocation?: boolean;
  requiresProductAmount?: boolean;
}

interface Props extends FieldProps<FormData> {
  query: ProductField_query;
  naicsCode?: ProductField_naicsCode;
}

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const ProductFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {formData, query, naicsCode, onChange} = props;

  // TODO: Clean up this function with array.some() as noted in https://github.com/bcgov/cas-ciip-portal/pull/621
  const productIsPublished = (formData, query) => {
    const product = query.allProducts.edges.find(
      ({node}) => node.rowId === formData.productRowId
    )?.node;
    if (product?.productState === 'PUBLISHED' || !product) return true;
    return false;
  };

  const productInNaicsCode = (formData, naicsCode) => {
    return naicsCode.allProductsByNaicsCode.edges.some(
      (edge) =>
        edge.node.rowId === formData.productRowId || !formData.productRowId
    );
  };

  const handleProductChange = (productRowId: number) => {
    const product = query.allProducts.edges.find(
      ({node}) => node.rowId === productRowId
    )?.node;
    onChange({
      ...formData,
      productRowId,
      productUnits: product?.units,
      requiresEmissionAllocation: product?.requiresEmissionAllocation,
      requiresProductAmount: product?.requiresProductAmount,
      isEnergyProduct: product?.isEnergyProduct,
      addPurchasedElectricityEmissions:
        product?.addPurchasedElectricityEmissions,
      addPurchasedHeatEmissions: product?.addPurchasedHeatEmissions,
      subtractExportedElectricityEmissions:
        product?.subtractExportedElectricityEmissions,
      subtractExportedHeatEmissions: product?.subtractExportedHeatEmissions,
      subtractGeneratedElectricityEmissions:
        product?.subtractGeneratedElectricityEmissions,
      subtractGeneratedHeatEmissions: product?.subtractGeneratedHeatEmissions,
      addEmissionsFromEios: product?.addEmissionsFromEios
    });
  };

  const handleChange = (product: FormData) => {
    if (formData.productRowId === product.productRowId) onChange(product);
    else handleProductChange(product.productRowId);
  };

  const archivedAlert = (
    <Alert variant="danger">
      <strong>Warning:</strong> This version of the Product or Service has been
      archived. Please remove it and select an appropriate replacement (it may
      have the same name)
    </Alert>
  );

  const notInNaicsAlert = (
    <Alert variant="danger">
      <strong>Warning:</strong> This Product or Service is not associated with
      the NAICS code reported in this application. Please review the guidance
      documents for a list of the valid products for your sector or verify the
      NAICS code reported in the Admin tab is correct.
    </Alert>
  );

  return (
    <>
      {!productIsPublished(formData, query) && archivedAlert}
      {!productInNaicsCode(formData, naicsCode) && notInNaicsAlert}
      <ObjectField {...props} disabled onChange={handleChange} />
    </>
  );
};

export default createFragmentContainer(ProductFieldComponent, {
  query: graphql`
    fragment ProductField_query on Query {
      allProducts {
        edges {
          node {
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
  `,
  naicsCode: graphql`
    fragment ProductField_naicsCode on NaicsCode {
      id
      allProductsByNaicsCode: productsByProductNaicsCodeNaicsCodeIdAndProductId(
        orderBy: PRODUCT_NAME_ASC
      ) {
        edges {
          node {
            rowId
            productName
            productState
          }
        }
      }
    }
  `
});
