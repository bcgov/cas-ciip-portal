import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

interface Props extends FieldProps {}

const EmissionGasFields: React.FunctionComponent<Props> = ({
  formData,
  onChange
}) => {
  console.log('props', onChange);

  return (
    <>
      <Col xs={12} md={12}>
        <Form.Row>
          <Col md={4}>{formData.gasType}</Col>
          <Col md={3}>
            <Form.Control
              type="number"
              value={formData.quantity}
              onChange={e => {
                onChange({
                  ...formData,
                  quantity: (e.nativeEvent.target as HTMLInputElement).value,
                  calculatedQuantity:
                    Number((e.nativeEvent.target as HTMLInputElement).value) *
                    formData.gwp
                });
              }}
            />
          </Col>
          <Col md={2} style={{textAlign: 'center', marginTop: '5px'}}>
            <ul className="gwp">
              <li>X</li>
              <li>{formData.gwp}</li>
              <li>=</li>
            </ul>
          </Col>
          <Col md={3}>
            <Form.Control
              disabled
              type="number"
              value={formData.calculatedQuantity}
            />
          </Col>
        </Form.Row>
        <style jsx>{`
          .gwp {
            list-style: none;
            display: inline-flex;
            padding: 0;
          }
          .gwp li {
            margin: 0 10px;
          }
        `}</style>
      </Col>
    </>
  );
};

export default EmissionGasFields;

/*
Todos:

- Define the sourcetype
  - pass all the fields so they can be saved

top level object: emissions
  - array of objects of source types
      - array of objects of gases

- create custom component for source type that renders sourcetype name and heading for tonnes and co2e
- custom componenent will recieve fragment with sourcetype name
- Component will render sub component with each gas as row


- Create onChange handlers X
- Create table for source types and gases
- Create form data from onload data and sourceType table
- Pass to emission


 */
