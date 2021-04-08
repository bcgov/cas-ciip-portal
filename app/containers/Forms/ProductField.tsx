import React from 'react';
import {Alert} from 'react-bootstrap';
import {FieldProps} from '@rjsf/core';
import ObjectField from '@rjsf/core/dist/cjs/components/fields/ObjectField';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductField_query} from 'ProductField_query.graphql';

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
}

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const ProductFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {formData, query, onChange} = props;

  const productIsPublished =
    formData.productRowId === undefined ||
    query.allProducts.edges.some(
      ({node}) =>
        node.productState === 'PUBLISHED' &&
        node.rowId === formData.productRowId
    );

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

  return (
    <>
      {!productIsPublished && (
        <Alert variant="danger">
          <strong>Warning:</strong> This version of the Product or Service has
          been archived. Please remove it and select an appropriate replacement
          (it may have the same name)
        </Alert>
      )}
      <ObjectField
        {...props}
        disabled={!productIsPublished}
        onChange={handleChange}
      />
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
  `
});
