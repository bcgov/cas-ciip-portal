import React from 'react';
import {FieldProps, IdSchema} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import NumberFormat from 'react-number-format';
import ErrorList from 'components/Forms/ErrorList';

const EmissionGasFields: React.FunctionComponent<FieldProps> = ({
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

  const {
    FieldTemplate
  }: {
    FieldTemplate: React.FunctionComponent<any>;
  } = registry as any;
  // Not using the types defined in @types/react-jsonschema-form as they are out of date

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
          <FieldTemplate
            hidden={false}
            id="emissions.annualEmission"
            classNames="form-group field field-number"
            label={null}
            schema={annualEmissionSchema}
            uiSchema={uiSchema}
            formContext={formContext}
            errors={
              <ErrorList
                errors={errorSchema?.annualEmission?.__errors as any}
              />
            }
          >
            <registry.fields.NumberField
              required
              schema={annualEmissionSchema}
              uiSchema={uiSchema}
              formData={formData.annualEmission}
              autofocus={autofocus}
              idSchema={idSchema.annualEmission as IdSchema}
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
          </FieldTemplate>
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
