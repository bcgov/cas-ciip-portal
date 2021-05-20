import React from 'react';
import {Alert, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FieldProps} from '@rjsf/core';
import ObjectField from '@rjsf/core/dist/cjs/components/fields/ObjectField';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductField_query} from 'ProductField_query.graphql';
import {ProductField_naicsCode} from 'ProductField_naicsCode.graphql';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

interface FormData {
  productRowId?: number;
  productAmount?: number;
  productUnits?: string;
  productEmissions?: number;
  requiresEmissionAllocation?: boolean;
  requiresProductAmount?: boolean;
  isMandatory?: boolean;
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

  const productIsPublished =
    query.allProducts.edges.some(
      ({node}) =>
        node.rowId === formData.productRowId &&
        node.productState === 'PUBLISHED'
    ) || !formData.productRowId;

  const productInNaicsCode =
    naicsCode?.allowableProducts.edges.some(
      (edge) => edge.node.productId === formData.productRowId
    ) || !formData.productRowId;

  const hasSelectableProducts = naicsCode?.allowableProducts?.edges.length > 0;

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
      archived. This archived product should be removed and an appropriate
      replacement selected (it may have the same name).
    </Alert>
  );

  const notInNaicsAlert = (
    <Alert variant="danger">
      <strong>Warning:</strong> This Product or Service is not associated with
      the NAICS code reported in this application. Please review the guidance
      documents for a list of the valid products for this sector or verify the
      NAICS code reported in the Administrative Data is correct.
    </Alert>
  );

  const noProductsToSelect = (
    <Alert variant="danger">
      <strong>Warning:</strong> No products were found matching the reported
      NAICS code. Please verify the NAICS code reported in the Administrative
      Data.
    </Alert>
  );

  const mandatoryProductLabel = (
    <strong>
      Mandatory Product
      <OverlayTrigger
        overlay={
          <Tooltip id="required-product-tooltip" placement="top">
            Based on the NAICS code entered in the Administrative Data section,
            reporting this product is required.
          </Tooltip>
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </OverlayTrigger>
    </strong>
  );

  const disableField = !productIsPublished || !productInNaicsCode;

  return (
    <>
      {!productIsPublished && archivedAlert}
      {!productInNaicsCode && notInNaicsAlert}
      {!hasSelectableProducts && noProductsToSelect}
      {formData.isMandatory && mandatoryProductLabel}
      <ObjectField {...props} disabled={disableField} onChange={handleChange} />
      <style jsx>{`
        :global(.svg-inline--fa.fa-info-circle) {
          margin-left: 0.5em;
        }
      `}</style>
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
      allowableProducts: productNaicsCodesByNaicsCodeId {
        edges {
          node {
            productId
            isMandatory
          }
        }
      }
    }
  `
});
