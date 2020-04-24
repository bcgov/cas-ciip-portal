import React, {useMemo} from 'react';
import {InputGroup} from 'react-bootstrap';
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
        enum: props.query.active.edges.map(({node}) => node.rowId),
        enumNames: props.query.active.edges.map(({node}) => node.name)
      },
      query: undefined
    }),
    [props]
  );

  const activeProductIds = props.query.active.edges.map(({node}) => node.rowId);
  const inactiveProductIds = [
    ...props.query.archived.edges.map(({node}) => node.rowId),
    ...props.query.deprecated.edges.map(({node}) => node.rowId)
  ];
  const inactiveProductNames = [
    ...props.query.archived.edges.map(({node}) => node.name),
    ...props.query.deprecated.edges.map(({node}) => node.name)
  ];

  if (activeProductIds.includes(props.formData) || props.formData === undefined)
    return <props.registry.fields.StringField {...fieldProps} />;

  const inactiveIndex = inactiveProductIds.indexOf(props.formData);
  return (
    <div>
      <InputGroup size="lg" className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            {inactiveProductNames[inactiveIndex]}
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
};

export default createFragmentContainer(ProductRowIdFieldComponent, {
  query: graphql`
    fragment ProductRowIdField_query on Query {
      active: allProducts(condition: {state: "active"}) {
        edges {
          node {
            rowId
            name
            state
          }
        }
      }
      archived: allProducts(condition: {state: "archived"}) {
        edges {
          node {
            rowId
            name
            state
          }
        }
      }
      # Todo: Remove when deprecated products are removed
      deprecated: allProducts(condition: {state: "deprecated"}) {
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
