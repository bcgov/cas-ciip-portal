import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const EmissionGasFields: React.FunctionComponent<FieldProps> = ({formData}) => {
  const hide_row =
    formData.annualEmission && formData.annualEmission > 0
      ? 'visible'
      : 'hidden';

  return (
    <Col xs={12} md={12} className={`${hide_row} emission-summary-row`}>
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
          <strong>Tonnes:</strong> {formData.annualEmission}
        </Col>
        <Col md={3}>
          <strong>Tonnes(CO2e): </strong>
          {formData.annualCO2e}
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
        .emission-summary-row.hidden:global {
          display: none;
        }
      `}</style>
      <style jsx global>{`
        .emission-summary-row.hidden {
          //display:none
        }
      `}</style>
    </Col>
  );
};

export default EmissionGasFields;
