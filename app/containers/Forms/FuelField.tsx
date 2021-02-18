import React from 'react';
import {FieldProps} from '@rjsf/core';
import {createFragmentContainer, graphql} from 'react-relay';
import {FuelField_query} from 'FuelField_query.graphql';
import ObjectField from '@rjsf/core/dist/cjs/components/fields/ObjectField';

interface Props extends FieldProps {
  query: FuelField_query;
}

const FuelField: React.FunctionComponent<Props> = (props) => {
  const {formData, query, onChange} = props;

  const handlefuelChange = (fuelRowId: number) => {
    const fuel = query.allFuels.edges.find(({node}) => node.rowId === fuelRowId)
      ?.node;
    onChange({
      ...formData,
      fuelRowId,
      fuelUnits: fuel?.units
    });
  };

  const handleChange = (fuel) => {
    if (formData.fuelRowId === fuel.fuelRowId) onChange(fuel);
    else handlefuelChange(fuel.fuelRowId);
  };

  return <ObjectField {...props} onChange={handleChange} />;
};

export default createFragmentContainer(FuelField, {
  query: graphql`
    fragment FuelField_query on Query {
      allFuels(condition: {state: "active"}) {
        edges {
          node {
            units
            rowId
          }
        }
      }
    }
  `
});
