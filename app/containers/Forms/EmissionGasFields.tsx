import React from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import NumberFormat from 'react-number-format';

interface Props extends FieldProps {
  annualEmission?: any;
}

const EmissionGasFields: React.FunctionComponent<Props> = ({
  formData,
  onChange,
  registry,
  autofocus,
  idSchema,
  errorSchema,
  formContext,
  disabled,
  readonly,
  schema,
  uiSchema
}) => {
  const {
    properties: {annualEmission: annualEmissionSchema}
  } = schema as {properties: Record<string, JSONSchema6>};

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
          <registry.fields.NumberField
            required
            schema={annualEmissionSchema}
            uiSchema={uiSchema.annualEmission}
            formData={formData.annualEmission}
            autofocus={autofocus}
            idSchema={idSchema}
            registry={registry}
            errorSchema={errorSchema?.annualEmission}
            formContext={formContext}
            disabled={disabled}
            readonly={readonly}
            name="annualEmission"
            onChange={value =>
              onChange({
                ...formData,
                annualEmission: value,
                annualCO2e: value * formData.gwp
              })
            }
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
