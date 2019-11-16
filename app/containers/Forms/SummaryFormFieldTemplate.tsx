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
  classNames
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

  return (
    <Form.Group style={{margin: 10}} className={classNames}>
      <Form.Label htmlFor={id}>
        <strong>{label}</strong>
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
