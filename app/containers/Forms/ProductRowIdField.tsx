import React, {useMemo} from 'react';
import {InputGroup} from 'react-bootstrap';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductRowIdField_query} from 'ProductRowIdField_query.graphql';

interface Props extends FieldProps<number> {
  query: ProductRowIdField_query;
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
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.isLinkModal
          ? props.query.published.edges
              .filter(({node}) => node.rowId > 7)
              .map(({node}) => node.rowId)
          : props.query.published.edges.map(({node}) => node.rowId),
        enumNames: props.isLinkModal
          ? props.query.published.edges
              .filter(({node}) => node.rowId > 7)
              .map(({node}) => node.productName)
          : props.query.published.edges.map(({node}) => node.productName)
      },
      query: undefined
    }),
    [props]
  );

  /**
   * Contains all products, split into arrays of published / archived product IDs and names.
   */
  const allProducts = useMemo(
    () => ({
      publishedProductIds: props.query.published.edges.map(
        ({node}) => node.rowId
      ),
      archivedProductIds: props.query.archived.edges.map(
        ({node}) => node.rowId
      ),
      archivedProductNames: props.query.archived.edges.map(
        ({node}) => node.productName
      )
    }),
    [props]
  );

  // Pass the fieldProps for published product
  if (
    allProducts.publishedProductIds.includes(props.formData) ||
    props.formData === undefined
  )
    return <props.registry.fields.StringField {...fieldProps} />;

  // Render a disabled text input for an archived product
  const archivedIndex = allProducts.archivedProductIds.indexOf(props.formData);
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            {allProducts.archivedProductNames[archivedIndex]}
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      published: allProducts(condition: {productState: PUBLISHED}) {
        edges {
          node {
            rowId
            productName
            productState
          }
        }
      }
      archived: allProducts(condition: {productState: ARCHIVED}) {
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
