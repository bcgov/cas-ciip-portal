import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import ObjectField from 'react-jsonschema-form/lib/components/fields/ObjectField';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductField_query} from 'ProductField_query.graphql';

interface FormData {
  productRowId?: number;
  quantity?: number;
  productUnits?: string;
  productEmissions?: number;
  requiresEmissionAllocation?: boolean;
}

interface Props extends FieldProps<FormData> {
  query: ProductField_query;
}

/**
 * This custom ObjectField component injects the read-only data for a product when the
 * product id changes
 */
export const ProductFieldComponent: React.FunctionComponent<Props> = props => {
  const {formData, query, onChange} = props;

  const handleChange = (product: FormData) => {
    if (formData.productRowId === product.productRowId) onChange(product);
    else handleProductChange(product.productRowId);
  };

  const handleProductChange = (productRowId: number) => {
    const product = query.allProducts.edges.find(
      ({node}) => node.rowId === productRowId
    )?.node;
    onChange({
      ...formData,
      productRowId,
      productUnits: product?.units,
      requiresEmissionAllocation: product?.requiresEmissionAllocation
    });
  };

  return <ObjectField {...props} onChange={handleChange} />;
};

export default createFragmentContainer(ProductFieldComponent, {
  query: graphql`
    fragment ProductField_query on Query {
      allProducts(condition: {state: "active"}) {
        edges {
          node {
            rowId
            units
            requiresEmissionAllocation
          }
        }
      }
    }
  `
});
