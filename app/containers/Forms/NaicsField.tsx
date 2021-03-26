import {FieldProps} from '@rjsf/core';
import React, {useMemo} from 'react';
import {Alert} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import {NaicsField_query} from '__generated__/NaicsField_query.graphql';

interface Props extends FieldProps<string> {
  query: NaicsField_query;
}

export const NaicsFieldComponent: React.FunctionComponent<Props> = (props) => {
  const naicsList = useMemo(
    () => props.query.naicsCodes.edges.map((edge) => edge.node.naicsCode),
    [props.query.naicsCodes]
  );
  const naicsDisplayList = useMemo(
    () =>
      props.query.naicsCodes.edges.map(
        (edge) => `${edge.node.naicsCode} - ${edge.node.naicsDescription}`
      ),
    [props.query.naicsCodes]
  );

  const fieldProps = {
    ...props,
    query: undefined,
    schema: {
      ...props.schema,
      enum: naicsList,
      enumNames: naicsDisplayList
    }
  };

  const invalidNaicsAlert =
    props.formData && !naicsList.includes(props.formData) ? (
      <Alert variant="danger" className="mt-3 mb-0">
        <strong>Warning:</strong> The naics code submitted to SWRS is not in the
        list of valid codes for this program. Please refer to the guidance
        documents and select an appropriate NAICS code.
      </Alert>
    ) : null;

  return (
    <>
      <props.registry.fields.StringField {...fieldProps} />
      {invalidNaicsAlert}
    </>
  );
};

export default createFragmentContainer(NaicsFieldComponent, {
  query: graphql`
    fragment NaicsField_query on Query {
      naicsCodes: allNaicsCodes {
        edges {
          node {
            naicsCode
            naicsDescription
          }
        }
      }
    }
  `
});
