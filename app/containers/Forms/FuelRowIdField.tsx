import React, { useMemo } from "react";
import { FieldProps } from "@rjsf/core";
import { createFragmentContainer, graphql } from "react-relay";
import { FuelRowIdField_query } from "FuelRowIdField_query.graphql";
import { InputGroup } from "react-bootstrap";

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

  const fuels = useMemo(
    () => ({
      activeRowIds: props.query.activeFuels.edges.map(({ node }) => node.rowId),
      activeNames: props.query.activeFuels.edges.map(({ node }) => node.name),

      // Object containing the archived fuels, keyed on the rowId
      archived: props.query.archivedFuels.edges.reduce(
        (archivedDict, { node }) => {
          archivedDict[node.rowId] = node.name;
          return archivedDict;
        },
        {}
      ),
    }),
    [props.query]
  );

  const fieldProps = useMemo(() => {
    return {
      ...props,
      query: undefined,
    };
  }, [props]);

  if (
    fuels.activeRowIds.includes(props.formData) ||
    props.formData === undefined
  )
    return <props.registry.fields.StringField {...fieldProps} />;

  return (
    <InputGroup>
      <InputGroup.Text className="col-md-12">
        {fuels.archived[props.formData]}
      </InputGroup.Text>
    </InputGroup>
  );
};

export default createFragmentContainer(FuelRowIdFieldComponent, {
  query: graphql`
    fragment FuelRowIdField_query on Query {
      activeFuels: allFuels(
        filter: { state: { equalTo: "active" } }
        orderBy: NAME_ASC
      ) {
        edges {
          node {
            rowId
            name
          }
        }
      }
      archivedFuels: allFuels(filter: { state: { equalTo: "archived" } }) {
        edges {
          node {
            rowId
            name
          }
        }
      }
    }
  `,
});
