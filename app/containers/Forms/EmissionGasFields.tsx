import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const EmissionGasFields: React.FunctionComponent<FieldProps> = ({
  formData,
  onChange
}) => {
  const hideRow = formData.annualEmission > 0 ? 'hidden' : 'visible';
  return (
    <Col xs={12} md={12} className={`${hideRow} emission-row`}>
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
          <NumberFormat
            thousandSeparator
            isNumericString
            allowNegative={false}
            allowEmptyFormatting={false}
            decimalScale={0} // Block formating long number to floating number
            value={formData.annualEmission}
            onValueChange={({value}) => {
              onChange({
                ...formData,
                annualEmission: value ?? Number(value),
                annualCO2e: Number(value) * formData.gwp
              });
            }}
          />
        </Col>
        <Col md={2} style={{textAlign: 'center'}}>
          <ul className="gwp">
            <li>X</li>
            <li>{formData.gwp}</li>
            <li>=</li>
          </ul>
        </Col>
        <Col md={3} style={{textAlign: 'center'}}>
          <NumberFormat
            thousandSeparator
            displayType="text"
            value={formData.annualCO2e}
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
