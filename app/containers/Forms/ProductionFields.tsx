import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {Form, Col} from 'react-bootstrap';
import {ProductionFields_query} from 'ProductionFields_query.graphql';

interface Props extends FieldProps {
  query: ProductionFields_query;
}

const ProductionFields: React.FunctionComponent<Props> = ({
  formData,
  query,
  onChange
}) => {
  const changeField = (event, key) => {
    onChange({
      ...formData,
      [key]: (event.nativeEvent.target as HTMLInputElement).value
    });
  };

  return (
    <>
      <Col xs={12} md={6}>
        <Form.Group controlId="id.product">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            value={formData.product}
            onChange={e => {
              onChange({
                ...formData,
                product: (e.nativeEvent.target as HTMLInputElement).value,
                productUnits: undefined
              });
            }}
          >
            <option value="">...</option>
            {query.allProducts.edges.map(({node}) => (
              <option key={node.name}>{node.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={2}>
        <Form.Group controlId="id.productUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control
            as="select"
            value={formData.productUnits}
            onChange={e => changeField(e, 'productUnits')}
          >
            <option value="">...</option>
            {query.allProducts.edges
              .filter(({node}) => node.name === formData.product)
              .map(({node}) => (
                <option key={node.name}>{node.units}</option>
              ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
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
      <Col xs={12} md={4}>
        <Form.Group controlId="id.associatedEmissions">
          <Form.Label>Associated Emissions (tCO2e)</Form.Label>
          <Form.Control
            type="number"
            defaultValue={formData.associatedEmissions}
            onChange={e => {
              onChange({
                ...formData,
                associatedEmissions: Number(
                  (e.nativeEvent.target as HTMLInputElement).value
                )
              });
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={12}>
        <Form.Group controlId="id.comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            type="string"
            value={formData.comments}
            onChange={e => {
              onChange({
                ...formData,
                comments: (e.nativeEvent.target as HTMLInputElement).value
              });
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};

export default createFragmentContainer(ProductionFields, {
  query: graphql`
    fragment ProductionFields_query on Query {
      allProducts {
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
