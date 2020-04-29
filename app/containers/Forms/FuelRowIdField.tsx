import React, {useMemo} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {FuelRowIdField_query} from 'FuelRowIdField_query.graphql';

interface Props extends FieldProps<number> {
  query: FuelRowIdField_query;
}

/**
 * Fetches the list of fuels and their row ids
 */
export const FuelRowIdFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  /**
   * Injects the list of Fuels in the schema, and remove `query` from the props
   * Other props are passed as-is to the StringField
   */
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.query.allFuels.edges.map(({node}) => node.rowId),
        enumNames: props.query.allFuels.edges.map(({node}) => node.name)
      },
      query: undefined
    }),
    [props]
  );

  return <props.registry.fields.StringField {...fieldProps} />;
};

export default createFragmentContainer(FuelRowIdFieldComponent, {
  query: graphql`
    fragment FuelRowIdField_query on Query {
      allFuels(condition: {state: "active"}) {
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
