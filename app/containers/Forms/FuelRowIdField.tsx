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

  const archivedFuels = useMemo(
    () =>
      props.query.archivedFuels.edges.reduce((archivedDict, { node }) => {
        archivedDict[node.rowId] = node.name;
        return archivedDict;
      }, {}),
    [props.query]
  );

  const fieldProps = useMemo(() => {
    return {
      ...props,
      query: undefined,
    };
  }, [props]);

  if (!archivedFuels[props.formData] || props.formData === undefined)
    return <props.registry.fields.StringField {...fieldProps} />;

  return (
    <InputGroup>
      <InputGroup.Text className="col-md-12">
        {archivedFuels[props.formData]}
      </InputGroup.Text>
    </InputGroup>
  );
};

export default createFragmentContainer(FuelRowIdFieldComponent, {
  query: graphql`
    fragment FuelRowIdField_query on Query {
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
