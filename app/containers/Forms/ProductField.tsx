import React from 'react';
import {Alert} from 'react-bootstrap';
import {FieldProps} from 'react-jsonschema-form';
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField';
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

  // TODO: Clean up this function with array.some() as noted in https://github.com/bcgov/cas-ciip-portal/pull/621
  const productIsPublished = (formData, query) => {
    const product = query.allProducts.edges.find(
      ({node}) => node.rowId === formData.productRowId
    )?.node;
    if (product?.productState === 'PUBLISHED' || !product) return true;
    return false;
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

  return productIsPublished(formData, query) ? (
    <ObjectField {...props} onChange={handleChange} />
  ) : (
    <>
      <Alert variant="danger">
        <strong>Warning:</strong> This version of the Product or Service has
        been archived. Please remove it and select an appropriate replacement
        (it may have the same name)
      </Alert>
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
  `
});
