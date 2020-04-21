import React, {useMemo} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductRowIdField_query} from 'ProductRowIdField_query.graphql';

interface Props extends FieldProps<number> {
  query: ProductRowIdField_query;
}

/**
 * Displays the information related to a product, and loads the additional data schema for products that need it.
 * By using the registry (which contains, for instance, the form's FieldTemplate and StringField)
 * this allows for this component to be reused in both the Form and the ApplicationDetailsCardItem components.
 * It will either render inputs or the values based on what is defined in the current jsonschema form registry.
 */
export const ProductRowIdFieldComponent: React.FunctionComponent<Props> = props => {
  /**
   * Injects the list of products in the schema, and remove `query` from the props
   * Other props are passed as-is to the StringField
   */
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.query.allProducts.edges.map(({node}) => node.rowId),
        enumNames: props.query.allProducts.edges.map(({node}) => node.name),
        state: props.query.allProducts.edges.map(({node}) => node.state)
      },
      query: undefined
    }),
    [props]
  );

  return <props.registry.fields.StringField {...fieldProps} />;
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      allProducts(condition: {state: "active"}) {
        edges {
          node {
            rowId
            name
            state
          }
        }
      }
    }
  `
});
