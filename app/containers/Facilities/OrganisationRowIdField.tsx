import React, {useMemo} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {OrganisationRowIdField_query} from 'OrganisationRowIdField_query.graphql';

interface Props extends FieldProps<number> {
  query: OrganisationRowIdField_query;
}

/**
 * Fetches the list of fuels and their row ids
 */
export const OrganisationRowIdFieldComponent: React.FunctionComponent<Props> = (
  props
) => {
  console.log(props);
  const fieldProps = useMemo(
    () => ({
      ...props,
      schema: {
        ...props.schema,
        enum: props.query.allOrganisations.edges.map(({node}) => node.rowId),
        enumNames: props.query.allOrganisations.edges.map(
          ({node}) => node.operatorName
        )
      }
    }),
    [props]
  );

  return <props.registry.fields.StringField {...fieldProps} />;
};

export default createFragmentContainer(OrganisationRowIdFieldComponent, {
  query: graphql`
    fragment OrganisationRowIdField_query on Query {
      allOrganisations {
        edges {
          node {
            rowId
            operatorName
          }
        }
      }
    }
  `
});
