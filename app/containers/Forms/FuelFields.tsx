import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {Form, Col} from 'react-bootstrap';
import {FuelFields_query} from 'FuelFields_query.graphql';

interface Props extends FieldProps {
  query: FuelFields_query;
}

const FuelFields: React.FunctionComponent<Props> = ({
  formData,
  query,
  schema,
  onChange
}) => {
  const changeField = (event, key) => {
    onChange({
      ...formData,
      [key]: (event.nativeEvent.target as HTMLInputElement).value
    });
  };

  console.log('queryf', query);
  return (
    <>
      <Col xs={12} md={6}>
        <Form.Group controlId="id.fuelType">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Control
            as="select"
            value={formData.fuelType}
            onChange={e => {
              onChange({
                ...formData,
                fuelType: (e.nativeEvent.target as HTMLInputElement).value,
                fuelUnits: undefined
              });
            }}
          >
            <option value="">...</option>
            {query.allFuels.edges.map(({node}) => (
              <option key={node.name}>{node.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={4}>
        <Form.Group controlId="id.quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            defaultValue={formData.quantity}
            onChange={e => {
              onChange({
                ...formData,
                quantity: Number(
                  (e.nativeEvent.target as HTMLInputElement).value
                )
              });
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={2}>
        <Form.Group controlId="id.fuelUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control
            as="select"
            value={formData.fuelUnits}
            onChange={e => changeField(e, 'fuelUnits')}
          >
            <option value="">...</option>
            {query.allFuels.edges
              .filter(({node}) => node.name === formData.fuelType)
              .map(({node}) => (
                <option key={node.name}>{node.units}</option>
              ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId="id.methodology">
          <Form.Label>Methodology</Form.Label>
          <Form.Control
            as="select"
            value={formData.methodology}
            onChange={e => changeField(e, 'methodology')}
          >
            <option value="">...</option>
            {(schema.properties.methodology as any).enum.map((e, i) => (
              <option key={e} value={e}>
                {(schema.properties.methodology as any).enumNames[i]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </>
  );
};

export default createFragmentContainer(FuelFields, {
  query: graphql`
    fragment FuelFields_query on Query {
      allFuels {
        edges {
          node {
            name
            units
          }
        }
      }
    }
  `
});
