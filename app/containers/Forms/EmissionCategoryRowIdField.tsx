import React, { useMemo } from "react";
import { FieldProps } from "@rjsf/core";
import { createFragmentContainer, graphql } from "react-relay";
import { EmissionCategoryRowIdField_query } from "EmissionCategoryRowIdField_query.graphql";

export interface Props extends FieldProps<number> {
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
        enum: props.query.activeEmissionCategories.edges.map(
          ({ node }) => node.rowId
        ),
        enumNames: props.query.activeEmissionCategories.edges.map(
          ({ node }) => node.displayName
        ),
      },
      query: undefined,
    }),
    [props]
  );

  // If the form data is set to an archived emission category, we return a text field
  if (props.formData !== undefined) {
    const archivedEmissionCategory = props.query.archivedEmissionCategories.edges.find(
      ({ node }) => node.rowId === props.formData
    );

    if (archivedEmissionCategory !== undefined)
      return (
        <span className="col-md-12">
          {archivedEmissionCategory.node.displayName}
        </span>
      );
  }

  return <props.registry.fields.StringField {...fieldProps} />;
};

export default createFragmentContainer(EmissionCategoryRowIdFieldComponent, {
  query: graphql`
    fragment EmissionCategoryRowIdField_query on Query {
      activeEmissionCategories: allEmissionCategories(
        filter: { deletedAt: { isNull: true } }
      ) {
        edges {
          node {
            rowId
            displayName
          }
        }
      }
      archivedEmissionCategories: allEmissionCategories(
        filter: { deletedAt: { isNull: false } }
      ) {
        edges {
          node {
            rowId
            displayName
          }
        }
      }
    }
  `,
});
