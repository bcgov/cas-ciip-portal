import React, { useMemo } from "react";
import { InputGroup } from "react-bootstrap";
import { FieldProps } from "@rjsf/core";
import { createFragmentContainer, graphql } from "react-relay";
import { ProductRowIdField_query } from "ProductRowIdField_query.graphql";
import { ProductRowIdField_naicsCode } from "ProductRowIdField_naicsCode.graphql";

interface Props extends FieldProps<number> {
  query: ProductRowIdField_query;
  naicsCode?: ProductRowIdField_naicsCode;
}

/**
 * Provides a list of products filtered by NAICS code for selection/display.
 * If a product is not associated with the NAICS code reported in the Administration data it is not
 * selectable from the dropdown.
 * If an invalid (not associated with the reported NAICS code or in 'archived' state) is reported, it
 * is rendered as a disabled input.
 */
export const ProductRowIdFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  /**
   * Injects the list of products in the schema, and remove `query` from the props
   * Other props are passed as-is to the StringField.
   */
  const fieldProps = useMemo(() => {
    const edges = props.naicsCode?.productNaicsCodes.edges || [];
    const allowedProducts = edges
      .map((e) => e.node.productByProductId)
      .sort((a, b) => a.productName.localeCompare(b.productName));

    const productIds = allowedProducts.map((p) => p.rowId);
    const productNames = allowedProducts.map((p) => p.productName);

    return {
      ...props,
      schema: {
        ...props.schema,
        enum: productIds,
        enumNames: productNames,
      },
      query: undefined,
    };
  }, [props]);

  /**
   * Contains all products, split into arrays of published / archived / (published products filtered by NAICS code) product IDs and names.
   */
  const allProducts = useMemo(
    () => ({
      publishedProductIds: props.query.published.edges.map(
        ({ node }) => node.rowId
      ),
      publishedProductNames: props.query.published.edges.map(
        ({ node }) => node.productName
      ),
      archivedProductIds: props.query.archived.edges.map(
        ({ node }) => node.rowId
      ),
      archivedProductNames: props.query.archived.edges.map(
        ({ node }) => node.productName
      ),
      productIdsByNaicsCode: props.naicsCode?.productNaicsCodes.edges.map(
        (e) => e.node.productByProductId.rowId
      ),
    }),
    [props]
  );

  const invalidProduct = (productName) => (
    <InputGroup>
      <InputGroup.Text className="col-md-12">{productName}</InputGroup.Text>
    </InputGroup>
  );
  // If product is valid (associated with reported NAICS code && not archived), render the Stringfield with fieldProps.
  if (
    (allProducts.productIdsByNaicsCode?.includes(props.formData) &&
      !allProducts.archivedProductIds.includes(props.formData)) ||
    props.formData === undefined
  )
    return <props.registry.fields.StringField {...fieldProps} />;

  // Else get the invalid product from the list of all products in the database & render the name as a disabled input.
  const invalidProductIds = [
    ...allProducts.publishedProductIds,
    ...allProducts.archivedProductIds,
  ];
  const invalidProductNames = [
    ...allProducts.publishedProductNames,
    ...allProducts.archivedProductNames,
  ];
  const invalidProductId = invalidProductIds.indexOf(props.formData);

  return <div>{invalidProduct(invalidProductNames[invalidProductId])}</div>;
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      published: allProducts(
        filter: { productState: { equalTo: PUBLISHED } }
        orderBy: PRODUCT_NAME_ASC
      ) {
        edges {
          node {
            rowId
            productName
          }
        }
      }
      archived: allProducts(
        filter: { productState: { equalTo: ARCHIVED } }
        orderBy: PRODUCT_NAME_ASC
      ) {
        edges {
          node {
            rowId
            productName
          }
        }
      }
    }
  `,
  naicsCode: graphql`
    fragment ProductRowIdField_naicsCode on NaicsCode {
      productNaicsCodes: productNaicsCodesByNaicsCodeId(
        filter: {
          deletedAt: { isNull: true }
          productByProductId: { productState: { equalTo: PUBLISHED } }
        }
      ) {
        edges {
          node {
            productByProductId {
              rowId
              productName
            }
          }
        }
      }
    }
  `,
});
