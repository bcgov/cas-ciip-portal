import React from 'react';
import {Col, Form} from 'react-bootstrap';
import {FieldTemplateProps} from 'react-jsonschema-form';

const FormFieldTemplate: React.FunctionComponent<FieldTemplateProps> = ({
  id,
  label,
  help,
  required,
  description,
  errors,
  children,
  schema,
  uiSchema
}) => {
  if (schema.type === 'array')
    return (
      <Col xs={12}>
        {description}
        {children}
        {errors}
        {help}
      </Col>
    );
  if (schema.type === 'object')
    return (
      <Col xs={12}>
        <Form.Row>
          {description}
          {children}
          {errors}
          {help}
        </Form.Row>
      </Col>
    );

  const xs = uiSchema['ui:col-xs'] || 12;
  const sm = uiSchema['ui:col-sm'] || xs;
  const md = uiSchema['ui:col-md'] || (sm < 6 ? sm : 6);
  const lg = uiSchema['ui:col-lg'] || md;
  const xl = uiSchema['ui:col-xl'] || lg;

  return (
    <Form.Group as={Col} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Form.Label htmlFor={id}>
        {label}
        {required ? '*' : null}
      </Form.Label>
      {description}
      {children}
      {errors}
      {help}
    </Form.Group>
  );
};

export default FormFieldTemplate;
