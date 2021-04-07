import React, {useMemo} from 'react';
import {InputGroup, Alert} from 'react-bootstrap';
import {FieldProps} from '@rjsf/core';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductRowIdField_query} from 'ProductRowIdField_query.graphql';
import {ProductRowIdField_naicsCode} from 'ProductRowIdField_naicsCode.graphql';

interface Props extends FieldProps<number> {
  query: ProductRowIdField_query;
  naicsCode?: ProductRowIdField_naicsCode;
}

/**
 * Separates active products from archived products & renders according to the product's state.
 * For active products, the fieldProps are generated & either a search dropdown component is rendered
 * or the value is rendered based on what is defined in the currentjsonschema form registry.
 * For archived proucts, a readonly input is rendered with the name of the archived product.
 * This split based on the state of the product allows archived products to be rendered in the product form,
 * but since only the active products are passed to the field props, these products are not available to be selected
 * from the search dropdown component when filling out an application.
 */
export const ProductRowIdFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  /**
   * Injects the list of products in the schema, and remove `query` from the props
   * Other props are passed as-is to the StringField.
   * If this component is rendered from the admin product-benchmark link product modal, the energy products are removed from the choices.
   */

  if (!props.naicsCode && !props.isLinkModal)
    return (
      <Alert variant="danger">
        We did not find any products associated with your NAICS code. Please
        verify the NAICS code entered in the Admin tab exists and is correct.
      </Alert>
    );

  const fieldProps = useMemo(() => {
    let productIds;
    let productNames;
    if (props.isLinkModal) {
      productIds = props.query.published.edges
        .filter(({node}) => node.isEnergyProduct === false)
        .map(({node}) => node.rowId);

      productNames = props.query.published.edges
        .filter(({node}) => node.isEnergyProduct === false)
        .map(({node}) => node.productName);
    } else if (props.naicsCode) {
      productIds = props.naicsCode.productsByNaicsCode.edges.map(
        ({node}) => node.rowId
      );
      productNames = props.naicsCode.productsByNaicsCode.edges.map(
        ({node}) => node.productName
      );
    } else {
      productIds = props.query.published.edges.map(({node}) => node.rowId);
      productNames = props.query.published.edges.map(
        ({node}) => node.productName
      );
    }
    return {
      ...props,
      schema: {
        ...props.schema,
        enum: productIds,
        enumNames: productNames,
        b: 'asdf'
      },
      query: undefined
    };
  }, [props]);

  /**
   * Contains all products, split into arrays of published / archived product IDs and names.
   */
  const allProducts = useMemo(
    () => ({
      publishedProductIds: props.query.published.edges.map(
        ({node}) => node.rowId
      ),
      publishedProductNames: props.query.published.edges.map(
        ({node}) => node.productName
      ),
      archivedProductIds: props.query.archived.edges.map(
        ({node}) => node.rowId
      ),
      archivedProductNames: props.query.archived.edges.map(
        ({node}) => node.productName
      ),
      productIdsByNaicsCode: props.naicsCode?.productsByNaicsCode.edges.map(
        ({node}) => node.rowId
      )
    }),
    [props]
  );

  const invalidProduct = (productName) => (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>{productName}</InputGroup.Text>
      </InputGroup.Prepend>
    </InputGroup>
  );

  if (props.naicsCode) {
    if (
      (allProducts.productIdsByNaicsCode.includes(props.formData) &&
        !allProducts.archivedProductIds.includes(props.formData)) ||
      props.formData === undefined
    )
      return <props.registry.fields.StringField {...fieldProps} />;

    const productIdsNotInNaicsCode = [
      ...allProducts.publishedProductIds,
      ...allProducts.archivedProductIds
    ];
    const productNamesNotInNaicsCode = [
      ...allProducts.publishedProductNames,
      ...allProducts.archivedProductNames
    ];
    const productIdOutsideNaicsCode = productIdsNotInNaicsCode.indexOf(
      props.formData
    );

    return (
      <div>
        {invalidProduct(productNamesNotInNaicsCode[productIdOutsideNaicsCode])}
      </div>
    );
  }

  if (
    allProducts.publishedProductIds.includes(props.formData) ||
    props.formData === undefined
  )
    return <props.registry.fields.StringField {...fieldProps} />;

  // Render a disabled text input for an archived product
  const archivedIndex = allProducts.archivedProductIds.indexOf(props.formData);
  return (
    <div>{invalidProduct(allProducts.archivedProductNames[archivedIndex])}</div>
  );
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      published: allProducts(
        filter: {productState: {equalTo: PUBLISHED}}
        orderBy: PRODUCT_NAME_ASC
      ) {
        edges {
          node {
            rowId
            productName
            productState
            isEnergyProduct
          }
        }
      }
      archived: allProducts(
        filter: {productState: {equalTo: ARCHIVED}}
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
  `,
  naicsCode: graphql`
    fragment ProductRowIdField_naicsCode on NaicsCode {
      id
      productsByNaicsCode: productsByProductNaicsCodeNaicsCodeIdAndProductId(
        filter: {productState: {equalTo: PUBLISHED}}
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
