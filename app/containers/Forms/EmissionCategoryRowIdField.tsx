import React, {useMemo} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {EmissionCategoryRowIdField_query} from 'EmissionCategoryRowIdField_query.graphql';

interface Props extends FieldProps<number> {
  query: EmissionCategoryRowIdField_query;
}

/**
 * Fetches the list of emission categories and their row ids
 */
export const EmissionCategoryRowIdFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  /**
   * Injects the list of Emission categories in the schema, and remove `query` from the props
   * Other props are passed as-is to the StringField
   */
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.query.allEmissionCategories.edges.map(
          ({node}) => node.rowId
        ),
        enumNames: props.query.allEmissionCategories.edges.map(
          ({node}) => node.displayName
        )
      },
      query: undefined
    }),
    [props]
  );

  return <props.registry.fields.StringField {...fieldProps} />;
};

export default createFragmentContainer(EmissionCategoryRowIdFieldComponent, {
  query: graphql`
    fragment EmissionCategoryRowIdField_query on Query {
      allEmissionCategories {
        edges {
          node {
            rowId
            displayName
          }
        }
      }
    }
  `
});
