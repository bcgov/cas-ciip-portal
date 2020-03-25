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
  const {
    formData,
    query,
    onChange,
    registry,
    autofocus,
    idSchema,
    errorSchema,
    formContext,
    schema,
    uiSchema
  } = props;

  const productRowIdSchema = useMemo(
    () => ({
      ...schema,
      enum: query.allProducts.edges.map(({node}) => node.rowId),
      enumNames: query.allProducts.edges.map(({node}) => node.name)
    }),
    [query.allProducts.edges, schema]
  );

  console.log(errorSchema);
  return (
    <registry.fields.StringField
      required
      disabled={false}
      readonly={false}
      schema={productRowIdSchema}
      uiSchema={uiSchema}
      formData={formData}
      autofocus={autofocus}
      idSchema={idSchema}
      registry={registry}
      errorSchema={errorSchema}
      formContext={formContext}
      name="product"
      onBlur={null}
      onChange={onChange}
    />
  );
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      allProducts(condition: {state: "active"}) {
        edges {
          node {
            rowId
            name
          }
        }
      }
    }
  `
});
