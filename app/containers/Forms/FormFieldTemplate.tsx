import React from 'react';
import {Col, Row} from 'react-bootstrap';

const FormFieldTemplate = ({
  id,
  label,
  help,
  required,
  description,
  errors,
  children,
  classNames,
  schema
}) => {
  const fieldContents = (
    <>
      {schema.type !== 'object' && (
        <label htmlFor={id} className={classNames}>
          {label}
          {required ? '*' : null}
        </label>
      )}
      {description}
      {children}
      {errors}
      {help}
    </>
  );
  if (schema.type === 'object')
    return (
      <Col xs={12}>
        <Row>{fieldContents}</Row>
      </Col>
    );
  return (
    <Col xs={12} md={6}>
      {fieldContents}
    </Col>
  );
};

export default FormFieldTemplate;
