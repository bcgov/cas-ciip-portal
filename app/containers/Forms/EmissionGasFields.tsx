import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const EmissionGasFields: React.FunctionComponent<FieldProps> = ({
  formData,
  onChange
}) => {
  return (
    <Col xs={12} md={12}>
      <Form.Row>
        <Col md={4}>
          {formData.gasType} <br />
          <Col
            md={10}
            style={{margin: 0, padding: 0, color: '#888', lineHeight: '17px'}}
          >
            <small>{formData.gasDescription}</small>
          </Col>
        </Col>
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
  );
};

export default EmissionGasFields;
